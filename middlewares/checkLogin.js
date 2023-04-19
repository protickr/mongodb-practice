const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    try{
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {username, userId} = decoded;
        req.username = username;
        req.userId = userId;
        next();

    }catch (err){
        next(new Error("Authentication failure"));
    }
};

module.exports = checkLogin; 