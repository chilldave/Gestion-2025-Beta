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
        return await operation(connection);
    } catch (err) {
        console.log(err);

         if (err.code === 'ER_BAD_DB_ERROR') {
            throw new DatabaseError('Database not found: ' + err.message);
        }
            
        // Si no es un error relacionado con la base de datos, lanzamos el error general
        if (err instanceof DatabaseError) {
            throw new DatabaseError('A database error occurred: ' + err.message);
        } else {
            throw err;  // Lanza el error original si no es de base de datos
        }

    }finally{
        if(connection)
            connection.release();
    }
}