import {handleDatabaseOperation} from '../utils/handleDB.js';
import { NotFoundError} from '../utils/errors.js';
import { drawsQuery } from '../utils/queries/draws_query.js';

export class Draws{

    // method to fetch all draws
    static async fetchAllDraws(){ 
        return await handleDatabaseOperation(async (conn) => {
            const [result] = await conn.query(drawsQuery.getDrawsList);
            if(result.length === 0 ){
                throw new NotFoundError('Data not Found or Database is empty');
            };
            return result;
        })
    }

    // method to fetch draw by id
    static async fetchDrawById({id}){
        return await handleDatabaseOperation(async (conn) => {
            const [result] = await conn.query(drawsQuery.getDrawById,[id]);
            // cause the query returns an array of objects, we need to check if the array is empty.
            if(result[0]?.id_persona === null){
                throw new NotFoundError(`Data not Found or doesn't exist draw with ID = ${id}`);
            };
            return result;
        })
    }
    

    // method to get the final list of draws
    static async getDrawFinalList(){
        
        return await handleDatabaseOperation(async (conn) => {
            const [result] = await conn.query(drawsQuery.getDrawFinalList);
            if(result.length === 0){
                throw new NotFoundError('Data not Found or Database is empty');
            };
            return result;
        })
    }

    static async fetchAvailableDraws(){
        return await handleDatabaseOperation(async (conn) => {
            const [result] = await conn.query(drawsQuery.getAvailableDraws);
            if(result.length === 0){
                throw new NotFoundError('Data not Found or Database is empty');
            };
            return result;
        })
    }
}