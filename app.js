import express from 'express';
import ConnectDB from './db/connectdb.js';
import router from './routes/web.js';
//import dotenv from "dotenv";
import "express-async-errors"; // use for automatic error detection without using trycatch 
import winston from 'winston';
//require('dotenv').config();
import 'winston-mongodb';
import logger from './logger/index.js';


if(!process.env.jwtprivatekey){
   console.error('Fatal error: jwtprivatekey is not defined');
   process.exit(1);
}

 const app = express();

 //error log display error in one place and creating log file
//winston.add(winston.transports.File, { filename: 'logfile.log'});
winston.add(new winston.transports.MongoDB({db: 'mongodb://127.0.0.1:27017/curd', level:'info'}));

 // use for passing data in url like req.body/ body parscer
 app.use(express.json())

 //static files
 app.use(express.static('public'));
  
 //sending data in url using urlencoded
 app.use(express.urlencoded({extends:false}))

 //load router
 app.use("/", router);

 //view engine
 app.set("view engine",'ejs');
 
//uncaught exception
process.on('uncaughtException', (ex)=>{
   console.log('we got uncaught Exception');
   logger.error(ex.message, ex)
   process.exit(1);
})

 //db connection
 const port = process.env.PORT || 80
 const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";

 ConnectDB(DATABASE_URL);


 // listerning server on port
 app.listen(port,()=>{
    console.log(`server listerning on port http:\\localhost:${port}`)
 })