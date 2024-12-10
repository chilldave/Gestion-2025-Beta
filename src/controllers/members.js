import {Member} from '../models/members.js';


export class MemberController{

    static async getAllMember (req,res){

        const members = await Member.getMembers();
        if(!members){
            return res.status(404).json({
                message: 'Members not Found',
                timestamp: new Date().toISOString(),
            });
        }
        res.set('my-own-header','Get Members');
        // res.render('members',{
        //     title: 'Members',
        //     members:members});
            res.status(200).json({
                message: 'User fetched succesfully',
                data: members,
                timestamp: new Date().toISOString(),
            }
            );
    };
    
    static async getMember (req,res){
        const id = req.params.id;

        if(id <0){
            return res.status(400).json({
                message: 'Invalid ID: ID cannot be negative',
                timestamp: new Date().toLocaleString(),
            });
        }

        const member = await Member.getMember({id});
        console.log(member);

        if(!member){
            return res.status(404).json({
                message: 'Member not found',
                timestamp: new Date().toLocaleString(),
            });
        }
        res.status(200).json({
            message: 'User fetched Successfully',
            timestamp: new Date().toISOString(),
            data: member,
            
        })
    }

    static async setMember (req,res){

        const {nombre} = req.body;
        console.log(req.body);
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


    };

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
};


