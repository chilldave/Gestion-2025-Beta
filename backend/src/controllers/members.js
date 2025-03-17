import {Member} from '../models/members.js';
import { NotFoundError,DatabaseError } from '../utils/errors.js';


export class MemberController{


    // (GET) method to get all members
    static async getAllMember (req,res){

        try{
            const members = await Member.getMembers();
            res.status(200).json({
                timestamp: new Date().toLocaleString(),
                success: true,
                stCode: "01",
                message: 'Users fetched succesfully',
                data: members,
            });
        }catch(err){
            console.log(err);
            if (err instanceof NotFoundError) {
                // Manejo específico para "no encontrado"
                res.status(404).json({
                  timestamp: new Date().toLocaleString(),
                  success: false,
                    stCode: "-1",
                  message: err.message,
                });
              } else if (err instanceof DatabaseError) {
                // Manejo de errores de base de datos
                res.status(500).json({
                  timestamp: new Date().toLocaleString(),
                  success: false,
                  stCode: "-2",
                  message: 'An error occurred with the database. Please try again later.',
                });
              } else {
                // Manejo de otros errores generales
                res.status(500).json({
                  timestamp: new Date().toLocaleString(),
                  success: false,
                  stCode: "-3",
                  message: 'An unexpected error occurred. Please try again later.',
                });
            }
        }
    }
    
    // (GET) method to get member by id
    static async getMember (req,res){
        const id = req.params.id;
        
        try {
            const member = await Member.getMember({id});
            res.status(200).json({
                timestamp: new Date().toLocaleString(),
                sucess: true,
                stCode: "01",
                message: 'User fetched Successfully',
                data: member,
            });
            
        } catch (err) {
            if (err instanceof NotFoundError) {
                // Manejo específico para "no encontrado"
                res.status(404).json({
                  timestamp: new Date().toLocaleString(),
                  success: false,
                  stCode: "-1",
                  message: err.message,
                });
              } else if (err instanceof DatabaseError) {
                // Manejo de errores de base de datos
                res.status(500).json({
                  timestamp: new Date().toLocaleString(),
                  success: false,
                  stCode: "-2",
                  message: 'An error occurred with the database. Please try again later.',
                });
              } else {
                // Manejo de otros errores generales
                res.status(500).json({
                  timestamp: new Date().toLocaleString(),
                  success: false,
                  stCode: "-3",
                  message: 'An unexpected error occurred. Please try again later.',
                });
              }
        }
    }

    // (POST) method to add a new member
    static async setMember (req,res){

        const {nombre} = req.body;
        const newNombre = nombre.trim();
        try {

            const newMember = await Member.createMember({nombre:newNombre});

            res.status(201).json({
                timestamp: new Date().toLocaleString(),
                sucess: true,
                stCode: "03",
                message: 'Member created successfully',
                member: newMember,
            })
        } catch (error) {

            if(error instanceof NotFoundError)
            res.status(400).json({
                timestamp: new Date().toLocaleString(),
                success: false,
                stCode: "-4",
                message: 'Failed to create member',
                error: error.message,
            });
        }
    }
    // (PUT) method to update a name 
    static async updateMember(req,res){
        const {id} = req.params;
        const {nombre} = req.body;
        if(!id || !nombre){

            return res.status(404).json({
                timestamp: new Date().toLocaleString(),
                success: false,
                message: 'Bad Request: Missing ID or Name',
            });
        }

        try{
            const updateMember = await Member.updateMember({id,nombre});
            res.status(200).json({
                message: 'Member updated successfully',
                timestamp: new Date().toLocaleString(),
                success: true,
                stCode: "01",
                data: updateMember,
            })
        }catch(err){
            if (err instanceof NotFoundError) {
                // Manejo específico para "no encontrado"
                res.status(409).json({
                  timestamp: new Date().toLocaleString(),
                  success: false,
                  stCode: "-4",
                  message: err.message,
                });
              } else if (err instanceof DatabaseError) {
                // Manejo de errores de base de datos
                res.status(500).json({
                  timestamp: new Date().toLocaleString(),
                  success: false,
                  stCode: "-2",
                  message: 'An error occurred with the database. Please try again later.',
                });
              } else {
                // Manejo de otros errores generales
                res.status(500).json({
                  timestamp: new Date().toLocaleString(),
                  success: false,
                  stCode: "-3",
                  message: 'An unexpected error occurred. Please try again later.',
                });
              }
        }

    }




    static async deleteMember(req,res){
        
        const {id} = req.params;
        console.log(req.params)
        console.log(id)
        console.log(id)
        if (!id) {
            return res.status(400).json({
                message: 'Bad Request: Missing member ID',
            });
        }
        try {
            const result = await Member.deleteMember({id});
            console.log('This is from Controllers',result)
            res.status(200).json({
                timestamp: new Date().toLocaleString(),
                success: true,
                stCode: "07",
                result,});
        } catch (err) {
          console.error("Error in deleteMember controller:", err);
            if (err instanceof NotFoundError) {
                // Manejo específico para "no encontrado"
                res.status(404).json({
                  timestamp: new Date().toLocaleString(),
                  success: false,
                  stCode: "-1",
                  message: err.message,
                });
              } else if (err instanceof DatabaseError) {
                // Manejo de errores de base de datos
                res.status(500).json({
                  timestamp: new Date().toLocaleString(),
                  success: false,
                  stCode: "-2",
                  message: 'An error occurred with the database. Please try again later.',
                });
              } else {
                // Manejo de otros errores generales
                res.status(500).json({
                  timestamp: new Date().toLocaleString(),
                  success: false,
                  stCode: "-3",
                  message: 'An unexpected error occurred. Please try again later.',
                });
              }
        }
    }
}


