import { pool } from "../utils/handleDB.js";
import { membersQuery } from "../utils/queries/members_query.js";
import { handleDatabaseOperation } from "../utils/handleDB.js";
import { NotFoundError } from "../utils/errors.js";
import { param } from "express-validator";
export class Member {

    // method to get all members from the persona table
    static async getMembers(){
        return await handleDatabaseOperation( async (conn) => {
            
            const [result] = await conn.query(membersQuery.getMembers);
                if(result.length === 0 ){
                    throw new  NotFoundError('Members not Found');
                };
            return result;
        })
    }

    //method to get member by id
    static async getMember({id}){

        const params = [`%${id}%`]    
        return await handleDatabaseOperation(async (conn) => {
            const [result] = await conn.query(membersQuery.getMember,[params]);
            if(result.length === 0){
                throw new NotFoundError(`Member not Found or Doesn't exist`);
            }
            return result;
        })
    }
    
    static async getMemberByName({name}){

        const params = [`${name}`]    
        console.log('paramas: ', params)
        return await handleDatabaseOperation(async (conn) => {
            const [result] = await conn.query(membersQuery.findByNameDB,[params]);
            return result;
        })
    }
    // method to add a new member
    static async createMember({nombre}){
        return await handleDatabaseOperation(async (conn) => {
            const [existingMember] = await conn.query(membersQuery.findByNameDB, [nombre]);
        if (existingMember.length > 0) {
            throw new NotFoundError(`Member Already Exists`);
        }
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
            
            const validResult= await this.getMemberByName({name: nombre});
            if (validResult.length > 0) {
                throw new NotFoundError(`There is already a person with the same name`);
            }

            const [result] = await conn.query(membersQuery.updateMember,[nombre,id]);
            if(result.affectedRows === 0){
                throw new NotFoundError(`No member found`);
            };            
            return { id, nombre};
        })
    }

    // method to delete member 
    static async deleteMember({id}){
        console.log(id)
        return await handleDatabaseOperation(async (conn) => {  

            // Intentar realizar la actualización antes de la eliminación
    const [updateBeforeDelete] = await conn.query(membersQuery.updateGroupBeforeDelete, [id]);

    // Aquí verificamos si no se afectaron filas, y si es así, podemos continuar
    if (updateBeforeDelete.affectedRows === 0) {
        console.log("No records updated before delete, but continuing with deletion...");
    }

    // Procedemos con la eliminación del miembro
    const [result] = await conn.query(membersQuery.deleteMember, [id]);


    // Si no se eliminó nada, lanzamos un error de "No encontrado"
    if (result.affectedRows === 0) {
        throw new NotFoundError(`No member found with id: ${id}`);
    }

    // Si todo fue bien, devolvemos el mensaje de éxito
    return {
        message: 'Member Deleted Successfully',
        data: id,
    };
})
}}