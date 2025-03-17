import {Router} from 'express';
import {DrawsController} from '../controllers/draws.js';

export const drawsRouter = Router();

drawsRouter.get('/getDraws',DrawsController.getDrawsList);

drawsRouter.get('/draws/:id',DrawsController.getDraw);

drawsRouter.get('/final',DrawsController.getFinalList);

drawsRouter.get('/available',DrawsController.getAvailableDraws);
