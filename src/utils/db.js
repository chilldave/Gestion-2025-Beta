import mysql from 'mysql2/promise';
import { connectionData } from '../config/db.js';

export const pool = mysql.createPool(connectionData); // we use promise 'cause we are using async/await
