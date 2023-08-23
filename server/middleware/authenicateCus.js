const jwt = require("jsonwebtoken");
const express = require("express");
const Customer = require("../models/userSchemaTwo");
// const cookieParser = require('cookie-parser');
// const app = express();

// app.use(cookieParser());

const AuthenticateCus = async(req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        if (!token) {
            throw new Error('No token provided');
        }

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootCustomer = await Customer.findOne({ _id: verifyToken._id, "tokens.token": token });
        // const rootCustomer = await Customer.findOne({ _id: verifyToken._id, "tokens.token": token });

        if (!rootCustomer) {
            throw new Error('Customer not Found')
        }
        req.token = token;
        req.rootCustomer = rootCustomer;
        // req.rootCustomer=rootCustomer;
        req.CustomerID = rootCustomer._id;
        // req.customerID = rootCustomer._id;

        next();
    } catch (err) {
        res.status(401).send('Unauthorized: ' + err.message);
        console.log(err);
    }
}



module.exports = AuthenticateCus;
