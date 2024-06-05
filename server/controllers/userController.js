// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const UserModel = require('../models/User');
// const express = require('express');
// const cookieParser = require('cookie-parser');

// cookieParser();
// const salt = bcrypt.genSaltSync(10);
// const secret = process.env.JWT_SECRET;

// const registerUser =  async(req, res) => {
//     const { username, email,  password} = req.body;
//     try {
//         const user = new UserModel({ username, email, 
//             password: bcrypt.hashSync(password, salt),
//         });
//         await user.save();
//         res.status(201).send('User registered successfully');
//     } catch (error) {
//         console.log(error);
//         res.status(400).send
//     }
// };

// const loginUser = async(req, res) => {
//     const { username, password } = req.body;
//     const user = await UserModel.findOne({ username});
//     const correctPas= bcrypt.compareSync(password, user.password);
//     if (correctPas) {
//         const token = jwt.sign({username, id: user._id}, secret, {
//             expiresIn: '24h',
//         }, (err,token ) =>{
            
//             if (err) {
//                 res.status(400).send('Invalid credentials');
//             }
//             res.cookie('token', token).json(
//             {
//                 id: user._id,
//                 username,
//             }
//             )
//         })

//     } else {
//         res.status(400).send('Invalid credentials');
//     }
    
// }

// const currentUser = async(req, res) => {
//     res.json(req.user);
// }


//  const logoutUser = async(req, res) => {
//     res.clearCookie('token').send('Logged out successfully');
// }


// module.exports = { registerUser, loginUser, currentUser, logoutUser };



const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new UserModel({
            username,
            email,
            password: bcrypt.hashSync(password, salt),
        });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(400).send('Error registering user');
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        const correctPass = bcrypt.compareSync(password, user.password);
        if (correctPass) {
            const token = jwt.sign({ username, id: user._id }, secret, {
                expiresIn: '2h',
            });
            res.cookie('token', token, { httpOnly: true }).json({
                id: user._id,
                username,
            });
        } else {
            res.status(400).send('Invalid credentials');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

const currentUser = async (req, res) => {
    res.json(req.user);
};

const logoutUser = async (req, res) => {
    res.clearCookie('token').send('Logged out successfully');
};

module.exports = { registerUser, loginUser, currentUser, logoutUser };
