const jwt = require("jsonwebtoken");
const express = require("express");
const Admin = require("../models/adminSchema");
// const cookieParser = require('cookie-parser');
// const app = express();

// app.use(cookieParser());

const AuthenticateAdmin = async(req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        if (!token) {
            throw new Error('No token provided');
        }

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootAdmin = await Admin.findOne({ _id: verifyToken._id, "tokens.token": token });
        // const rootCustomer = await Customer.findOne({ _id: verifyToken._id, "tokens.token": token });

        if (!rootAdmin) {
            throw new Error('Admin not Found')
        }
        req.token = token;
        req.rootAdmin = rootAdmin;
        // req.rootCustomer=rootCustomer;
        req.AdminID = rootAdmin._id;
        // req.customerID = rootCustomer._id;

        next();
    } catch (err) {
        res.status(401).send('Unauthorized: ' + err.message);
        console.log(err);
    }
}



module.exports = AuthenticateAdmin;
