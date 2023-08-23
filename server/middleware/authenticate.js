const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../models/userSchema");
// const cookieParser = require('cookie-parser');
// const app = express();

// app.use(cookieParser());

const Authenticate = async(req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        if (!token) {
            throw new Error('No token provided');
        }

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });
        // const rootCustomer = await Customer.findOne({ _id: verifyToken._id, "tokens.token": token });

        if (!rootUser) {
            throw new Error('User not Found')
        }
        req.token = token;
        req.rootUser = rootUser;
        // req.rootCustomer=rootCustomer;
        req.userID = rootUser._id;
        // req.customerID = rootCustomer._id;

        next();
    } catch (err) {
        res.status(401).send('Unauthorized: ' + err.message);
        console.log(err);
    }
}



module.exports = Authenticate;
