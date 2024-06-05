const jwt = require('jsonwebtoken');
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const PostModel = require('../models/Post');
const cookieParser = require('cookie-parser');

const secret = process.env.JWT_SECRET;
const uploadMiddleware = multer({ dest: 'uploads/' });

const app = express();
app.use(cookieParser());
// app.use('/uploads', express.static(__dirname + '/uploads'));

const createPostHandler = async (req, res) => {
    try {
        const path = req.file.path;
        const originalname = req.file.originalname;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = `${path}.${ext}`;
        fs.renameSync(path, newPath);

        const token = req.cookies.token;
        console.log(token)
        jwt.verify(token, secret, async (err, decoded) => {
            if (err) {
                return res.status(400).send('Invalid token');
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
    } catch (error) {
        res.status(500).send('Server error');
    }
    console.log('createPostHandler');
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find()
            .populate('author', ['username'])
            .sort({ createdAt: -1 })
            .limit(25);
        res.json(posts);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id)
            .populate('author', ['username']);
        res.json(post);
    } catch (error) {
        res.status(404).send('Post not found');
    }
};

const updatePostHandler = async (req, res) => {
    try {
        let newPath = null;
        if (req.file) {
            const path = req.file.path;
            const originalname = req.file.originalname;
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            newPath = `${path}.${ext}`;
            fs.renameSync(path, newPath);
        }

        const token = req.cookies.token;
        jwt.verify(token, secret, async (err, decoded) => {
            if (err) {
                return res.status(400).send('Invalid token');
            }

            const { id, title, summary, content } = req.body;
            const postDoc = await PostModel.findById(id);
            const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(decoded.id);

            if (!isAuthor) {
                return res.status(403).send('You are not the author of this post');
            }

            await postDoc.updateOne({
                title: title || postDoc.title,
                summary: summary || postDoc.summary,
                content: content || postDoc.content,
                image: newPath || postDoc.image,
            });

            res.json(postDoc);
        });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

const deletePost = async (req, res) => {
    try {
        const token = req.cookies.token;
        jwt.verify(token, secret, async (err, decoded) => {
            if (err) {
                return res.status(400).send('Invalid token');
            }

            const post = await PostModel.findById(req.params.id);
            const isAuthor = JSON.stringify(post.author) === JSON.stringify(decoded.id);

            if (!isAuthor) {
                return res.status(403).send('You are not the author of this post');
            }

            await post.deleteOne();
            res.json(post);
        });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

module.exports = {
    createPost: [uploadMiddleware.single('file'), createPostHandler],
    getAllPosts,
    getPostById,
    updatePosts: [uploadMiddleware.single('file'), updatePostHandler],
    deletePost,
};
