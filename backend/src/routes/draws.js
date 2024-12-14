import {Router} from 'express';
import {DrawsController} from '../controllers/draws.js';

export const drawsRouter = Router();

drawsRouter.get('/',DrawsController.getList);

drawsRouter.get('/draws/:id',DrawsController.getDraw);

drawsRouter.get('/final',DrawsController.getFinalList);


