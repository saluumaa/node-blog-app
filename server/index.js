const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

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
            res.cookie('token', token).json('Logged in successfully')
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


 
app.get('/logout', (req, res) => {
    res.clearCookie('token').send('Logged out successfully');
});



app.listen(3001, () => {
    console.log('server is running on port 3001');
 });

 // mongodb+srv://salma:sacaada143@cluster0.trkkkbi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0