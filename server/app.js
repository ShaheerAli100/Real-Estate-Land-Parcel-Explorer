const dotenv=require('dotenv');
const express=require('express');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser')
const app=express();
app.use(cookieParser());

dotenv.config({path: './config.env'});
const PORT=process.env.PORT;

require('./db/conn');

app.use(express.json());

app.use(require('./router/auth'));

app.listen(PORT,()=>{
    console.log(`server is running at port no ${PORT} successfully`);
})
