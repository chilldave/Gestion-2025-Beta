import {Router} from 'express';
import {PaymentAction} from '../controllers/payment.js'

export const paymentRoute = Router();

paymentRoute.get('/getPayments',PaymentAction.getList);
paymentRoute.get('/getPayments/:id',PaymentAction.getPaymentById);
paymentRoute.post('/updatePayment',PaymentAction.updatePaymentById);