const jwt = require('jsonwebtoken');
const config = require('config');
require('dotenv').config();

module.exports = function(req, res, next){
    //Get token from header
    const token = req.header('x-auth-token');

    //If token doesn't exist
    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied'});

    }

    //Verify Token
    try {
        const decoded = jwt.verify(token, process.env.jwtSecret);
        req.user = decoded.user;
        next();
    }
    catch(error){
        console.error(error.message);
        res.status(401).json({msg: "Token is not valid"});
    }
}