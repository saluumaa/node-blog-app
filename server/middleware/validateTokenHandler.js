const jwt = require('jsonwebtoken');

const validateTokenHandler = (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).send('Unauthorized: No token provided');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).send('Invalid token');
        }
        req.user = decoded; 
        next();
    });
};

module.exports = validateTokenHandler;
