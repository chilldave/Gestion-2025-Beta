import { pool } from "../utils/db.js";

export class Member {
    static async getMembers(){
        let connection = null
        try {
            connection =  await pool.getConnection();
            const query = 'SELECT * FROM persona p';
            const [result] = await connection.query(query); // Realiza la consulta utilizando await
            if(result.length  === 0 ){
                console.warn('No data found');
            }
            return result;
          } catch (err) {
            // console.error('Error executing query:', err.message);
            // res.status(500).json({ error: 'Data not found' });
            console.error('Error executing query:', err.message);
            throw new Error('Database query failed'); // Lanza un error en lugar de manejar la respuesta
          }finally{
            if(connection)
                connection.release();
          }
    }
    static async getMember({id}){
        let connection = null
        try{
            connection = await pool.getConnection();
            const query = "SELECT * FROM persona p WHERE p.id_persona = ?";
            const [result] = await connection.query(query,[id]); 
            return result.length > 0 ? result[0] : null;   //validate if the field exists.

        }catch(err){
            console.error('Error obteniendo el miembro:', err.message);
            throw err; // Re-lanzas el error para que el controlador lo maneje
        }finally{

            if(connection)
                connection.release();
        }

    };
    
    static async setMember({nombre}){
        let connection = null
        try{
            connection = await pool.getConnection();
            const query = "INSERT INTO persona (nombre) values(?)";
            const [result] = await connection.query(query,[nombre]);
            if(result === 0 ){
                throw new Error(`No se encontró un miembro con id_persona = ${id}`);
            }
            return {
                id: result.insertId,
                nombre,
            };
            
        }catch(err){
            console.error('Error obteniendo el miembro:', err.message);
            throw err; // Re-lanzas el error para que el controlador lo maneje
        }finally{
            if(connection)
                connection.release();
        }
    };

    static async deleteMember({id}){
        let connection = null
        try{
            connection = await pool.getConnection();
            const query = 'DELETE FROM persona WHERE id_persona = ?';
            const [result] = await connection.query(query,[id]);
            if(result.affectedRows === 0 ){
                throw new Error(`No member found with the given ID = ${id} `);
            }
            return {
                message: 'Member Deleted Successfully',
                data: id,
            };
            
        }catch(err){
            console.error('Error obteniendo el miembro:', err.message);
            throw err; // Re-lanzas el error para que el controlador lo maneje
        }finally{
            if(connection)
                connection.release();
        }
    }
}