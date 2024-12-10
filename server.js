
import 'dotenv/config';
// const express  = require('express');
import express from 'express';
import {engine} from 'express-handlebars';
import path from 'path';
// import {pool} from './src/utils/db.js';
import { RouterDashboard } from './src/routes/dashboard.js';
import {memberRouter} from './src/routes/members.js';
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




app.use('/dashboard',RouterDashboard);
app.use('/members',memberRouter);
app.use('/',RouterDashboard);

// app.get('/',async (req,res)=>{
//     try {
//         const connection =  await pool.getConnection();
//         const query = 'SELECT * FROM grupo g JOIN cuota c ON c.id_cuota = g.id_cuota';
//         const [result] = await connection.query(query); // Realiza la consulta utilizando await
//         // console.table(result);
//         res.json(result); // Envía el resultado como respuesta
//         connection.release();
//       } catch (err) {
//         console.error('Error executing query:', err.message);
//         res.status(500).json({ error: 'Data not found' });
//       }
// })

//



// listening Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) =>{
    if(!error){
        console.log("Server is Successfully Running, and App is listening on PORT "+PORT);
    }else{
        console.log("Error Ocurred, sever can't start "+ error);
    }
})