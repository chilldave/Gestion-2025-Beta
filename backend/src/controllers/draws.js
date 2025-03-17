import {Draws} from '../models/draws.js';
import { ValidationError } from '../utils/errors.js';

export class DrawsController{
    // method to list all draws with total of participants and count of draws
    static async getDrawsList (req, res){
        try{
            const list = await Draws.fetchAllDraws();
            res.status(200).json({
                timestamp: new Date().toLocaleString(),
                message: 'List fetched successfully',
                data: list,
            });
        }catch(err){    
            // console.log(err);
        
            res.status(500).json({
                timestamp: new Date().toLocaleString(),
                message: 'Failed to fetch list',
                error: err.message,
            });
        }
    }

    // method to get the draw by id
    static async getDraw(req,res){
        const {id} = req.params;
        try {
            if(id <= 0 ){
                throw new ValidationError('Invalid ID');
            }
            const draw = await Draws.fetchDrawById({id});
            res.status(200).json({
                timestamp: new Date().toLocaleString(),
                message: 'Draw fetched successfully',
                data: draw,
            });
        } catch (err) {
            console.log('Error getting the draw:', err.message);
            res.status(500).json({
                message: 'Failed to fetch draw',
                error: err.message,
            });
        }
    }

    // method to get the final list of draws
    static async getFinalList(req,res){
        try {
            const list = await Draws.getDrawFinalList();
            res.status(200).json({
                timestamp: new Date().toLocaleString(),
                message: 'Final list fetched successfully',
                data: list,
            })
        } catch (err) {
            res.status(500).json({
                message: 'Failed to fetch final list',
                error: err.message,
            });
        }
    }

    static async getAvailableDraws(req,res){
        try {
            const list = await Draws.fetchAvailableDraws();
            res.status(200).json({
                timestamp: new Date().toLocaleString(),
                message: 'Available draws fetched successfully',
                data: list,
            })
        } catch (err) {
            res.status(500).json({
                message: 'Failed to fetch available draws',
                error: err.message,
            });
        }
    }
}
