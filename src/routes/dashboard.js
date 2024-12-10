import {Router} from 'express';
import {getMainPage} from '../controllers/dashboard.js';

export const RouterDashboard = Router();

RouterDashboard.get('/',getMainPage);

