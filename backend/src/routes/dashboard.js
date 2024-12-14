import {Router} from 'express';
import {drawsRouter} from './draws.js';
import {memberRouter} from './members.js'
// import {getMainPage} from '../controllers/dashboard.js';


export const dashboardRouter = Router();

dashboardRouter.use('/draws',drawsRouter);
dashboardRouter.use('/members',memberRouter);
// RouterDashboard.get('/',getMainPage);




