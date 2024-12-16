import { pool } from "../utils/handleDB.js";
import { membersQuery } from "../utils/queries/members_query.js";
import { handleDatabaseOperation } from "../utils/handleDB.js";
import { NotFoundError } from "../utils/errors.js";
export class Member {

    // method to get all members from the persona table
    static async getMembers(){
        return await handleDatabaseOperation( async (conn) => {

            const [result] = await conn.query(membersQuery.getMembers);
            if(result.length === 0 ){
                throw NotFoundError('Data not Found or Database is empty');
            };
            return result;
        })
    }

    //method to get member by id
    static async getMember({id}){
        const params = [`%${id}%`]
        return await handleDatabaseOperation(async (conn) => {
            const [result] = await conn.query(membersQuery.getMember,[params]);
            console.log(result);
            if(result.length === 0){
                throw new NotFoundError(`Data not Found or doesn't exist person with ID = ${id}`);
            }
            return result;
        })
    }
    
    // method to add a new member
    static async createMember({nombre}){
        return await handleDatabaseOperation(async (conn) => {
            const [result] = await conn.query(membersQuery.createMember,[nombre]);
            return {
                id: result.insertId,
                nombre,
            }
        })
    }

    // method to update member
    static async updateMember({id,nombre}){

        return await handleDatabaseOperation(async (conn) => {
            const [result] = await conn.query(membersQuery.updateMember,[nombre,id]);
            if(result.affectedRows === 0){
                throw new NotFoundError(`No member found with the given ID = ${id}`);
            };
            return { id, nombre};
        })
    }

    // method to delete member 
    static async deleteMember({id}){

        return await handleDatabaseOperation(async (conn) => {
            const [result] = await conn.query(membersQuery.deleteMember,[id]);
            if(result.affectedRows === 0){
                throw new NotFoundError(`No member found with the given ID = ${id}`);
            };
            return {
                message: 'Member Deleted Successfully',
                data: id,
            }
        })
    }
}