
import 'dotenv/config';
// const express  = require('express');
import express from 'express';
import {engine} from 'express-handlebars';
import path from 'path';
// import {pool} from './src/utils/db.js';
import { dashboardRouter } from './src/routes/dashboard.js';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
// Definir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(morgan('dev'));
 
//middleware to use json structure
app.use(express.json());

app.engine('hbs',engine({extname:'.hbs',
  partialsDi: path.join(__dirname,'src/views/partials')}));
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'src/views'));



app.use('/dashboard',dashboardRouter);


// listening Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) =>{
    if(!error){
        console.log("Server is Successfully Running, and App is listening on PORT "+PORT);
    }else{
        console.log("Error Ocurred, sever can't start "+ error);
    }
})