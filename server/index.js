const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnection');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes'); 

const app = express();

connectDB()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });

app.use(cors({
    origin: 'https://66541cd6f9308b2ccf4605cd--imaginative-dusk-5ee5e7.netlify.app/', 
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
