import mysql from 'mysql2/promise';
import { connectionData } from '../config/db.js';
import { DatabaseError } from './errors.js';


// Pool is a collection of connections that can be reused
export const pool = mysql.createPool(connectionData); // we use promise 'cause we are using async/await

// Error handling function to manage database operations
export const handleDatabaseOperation = async (operation) => {

    let connection = null;
    try {
        connection = await pool.getConnection();
        console.log('Connection from handleDBOperation:',connection);
        return await operation(connection);
    } catch (err) {
        console.log('Database operation error:', err.message);
        throw new DatabaseError(err.message);
        
    }finally{
        if(connection)
            connection.release();
    };
}