
import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
// import {pool} from './src/utils/db.js';
import { dashboardRouter } from './src/routes/dashboard.js';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
// Definir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(morgan('dev'));
app.use(cors());
 
//middleware to use json structure
app.use(bodyParser.json());

app.use('/api',dashboardRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'An unexpected error occurred',
    });
});
// app.use((req, res) => {
//     res.status(404).json({
//         success: false,
//         message: `Ruta ${req.originalUrl} no encontrada`,
//     });
// });





// listening Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) =>{
    if(!error){
        console.log("Server is Successfully Running, and App is listening on PORT "+PORT);
    }else{
        console.log("Error Ocurred, sever can't start "+ error);
    }
})