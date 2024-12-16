import {Member} from '../models/members.js';


export class MemberController{
    // (GET) method to get all members API
    static async getAllMember (req,res){

        try{
            const members = await Member.getMembers();
            res.set('my-own-header','Get Members');
            res.status(200).json({
                timestamp: new Date().toLocaleString(),
                message: 'User fetched succesfully',
                data: members,
            }
            );
        }catch(err){
            console.log('Error in getAllMember:', err.message);
            // Respond with a 500 Internal Server Error
            res.status(500).json({
                timestamp: new Date().toLocaleString(),
                message: 'An error occurred while fetching members',
                error: err.message, // Avoid exposing sensitive details in production
            });
        }
    }
    
    // (GET) method to get member by id
    static async getMember (req,res){

        const id = req.params.id;
        try {
            const member = await Member.getMember({id});
            res.status(200).json({
                timestamp: new Date().toLocaleString(),
                message: 'User fetched Successfully',
                data: member,
            });
            
        } catch (err) {
            return res.status(404).json({
                message: 'Member not found',
                error: err.message,
                timestamp: new Date().toLocaleString(),
            });
        }
    }


    // (POST) method to add a new member
    static async setMember (req,res){

        const {nombre} = req.body;
        
        try {
            const newMember = await Member.setMember({nombre});
            res.status(200).json({
                message: 'Member created successfully',
                member: newMember,
            });
        } catch (error) {
            res.status(500).json({
                message: 'Failed to create member',
                error: error.message,
            });
        }
    }

    static async updateMember(req,res){
        const {id} = req.params;
        const {nombre} = req.body;
        if(!id || !nombre){

            return res.status(404).json({
                message: 'Bad Request: Missing ID or Name',
            });
        }

        try{
            const updateMember = await Member.updateMember({id,nombre});
            res.status(200).json({
                message: 'Member updated successfully',
                timestamp: new Date().toLocaleString(),
                data: updateMember,
            })
        }catch(err){
            res.status(500).json({
                message: 'Failed to update member',
                error: err.message,
            });
        }

    }




    static async deleteMember(req,res){
        
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Bad Request: Missing member ID',
            });
        }
        try {
            const result = await Member.deleteMember({id});
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({
                message: 'Failed to delete member',
                error: err.message,
            });
        }
    }
}


