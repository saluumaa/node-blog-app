const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const PostModel = require('./models/Post');

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret= 'mysecretkey';
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
    }
));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))

mongoose.connect('mongodb+srv://salma:sacaada143@cluster0.trkkkbi.mongodb.net/test?retryWrites=true&w=majority');

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/register', async(req, res) => {
    const { username, email,  password} = req.body;
    try {
        const user = new UserModel({ username, email, 
            password: bcrypt.hashSync(password, salt),
        });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.log(error);
        res.status(400).send
    }
});

app.post('/login', async(req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username});
    const correctPas= bcrypt.compareSync(password, user.password);
    if (correctPas) {
        const token = jwt.sign({username, id: user._id}, secret, {}, (err,token ) =>{
            
            if (err) {
                res.status(400).send('Invalid credentials');
            }
            res.cookie('token', token).json(
            {
                id: user._id,
              
                // username: user.username,
                username,
            }
            )
        })

    } else {
        res.status(400).send('Invalid credentials');
    }
    
});

app.get('/me', (req, res) => {
    const token = req.cookies.token;
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            res.status(400).send('Invalid token');
        }
        res.json(decoded);
    });
});


 
app.post('/logout', (req, res) => {
    res.clearCookie('token').send('Logged out successfully');
});

app.post('/posts', uploadMiddleware.single('file'), async(req, res) => {
  const path = req.file.path;
const originalname = req.file.originalname;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

  const token = req.cookies.token;
  jwt.verify(token, secret, async(err, decoded) => {
    if (err) {
        res.status(400).send('Invalid token');
    }
    const { title, summary, content } = req.body;
    const post = await PostModel.create({
            title, 
            summary, 
            content, 
            image: newPath,
            author: decoded.id,
         });
     
       res.json(post);
    });
 

});

app.get('/posts', async(req, res) => {
    const posts = await PostModel.find()
    .populate('author', ['username'])
    .sort({createdAt: -1})
    .limit(25);
    res.json(posts)
    
});

app.get('/post/:id', async(req, res) => {
   try{
    const post = await PostModel.findById(req.params.id)
    .populate('author', ['username']);
    res.json(post);
   }
    catch (error) {
         res.status(404).send('Post not found');
    }
});

app.put('/posts', uploadMiddleware.single('file'), async(req, res) => {
    let newPath = null;
    if(req.file) {
        const path = req.file.path;
        const originalname = req.file.originalname;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const token = req.cookies.token;
    jwt.verify(token, secret, async(err, decoded) => {
        if (err) {
            res.status(400).send('Invalid token');
        }
        const {id, title, summary, content } = req.body;
        const postDoc = await PostModel.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(decoded.id);
        
        if (!isAuthor) {
            res.status(403).send('You are not the author of this post');
        }
        await postDoc.updateOne({
            title: title? title: postDoc.title,
            summary: summary? summary: postDoc.summary,
            content: content? content: postDoc.content,
            image: newPath? newPath: postDoc.image,
        });
        res.json(postDoc);
    });
});

app.delete('/post/:id', async(req, res) => {
    const token = req.cookies.token;
    jwt.verify(token, secret, async(err, decoded) => {
        if (err) {
            res.status(400).send('Invalid token');
        }
        const post = await PostModel.findById(req.params.id);
        const isAuthor = JSON.stringify(post.author) === JSON.stringify(decoded.id);
        if (!isAuthor) {
            res.status(403).send('You are not the author of this post');
        }
        await post.deleteOne();
        res.json(post);
    });
});

app.listen(3001, () => {
    console.log('server is running on port 3001');
 });
