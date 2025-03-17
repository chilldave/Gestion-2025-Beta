import {Router} from 'express';
import {drawsRouter} from './draws.js';
import {memberRouter} from './members.js';
import {paymentRoute} from './payment.js';



export const dashboardRouter = Router();

dashboardRouter.use('/draws',drawsRouter);
dashboardRouter.use('/members',memberRouter);
dashboardRouter.use('/payment',paymentRoute);





