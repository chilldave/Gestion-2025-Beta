import { param } from 'express-validator';
import {PaymentModel} from '../models/payment.js';
import { NotFoundError,DatabaseError } from '../utils/errors.js';

export class PaymentAction {

    static async getList (req,res){
        try{
                    const payments = await PaymentModel.fetchPayments();
                    // console.log(payments);
                    res.status(200).json({
                        timestamp: new Date().toLocaleString(),
                        success: true,
                        stCode: "01",
                        message: 'Users fetched succesfully',
                        data: payments,
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

    static async getPaymentById (req,res){
        try{
                    const idPayment = req.params.id;

                    
                    const payments = await PaymentModel.fetchPaymentsById({id: idPayment});
                    res.status(200).json({
                        timestamp: new Date().toLocaleString(),
                        success: true,
                        stCode: "01",
                        message: 'Users fetched succesfully',
                        data: payments,
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

    static async updatePaymentById (req,res){
      
      const {payments} = req.body;
      let formattedPayments = [];
    
    // Si recibes un arreglo de pagos directamente, procesamos el array
    if (Array.isArray(payments)) {
        formattedPayments = payments.map(payment => ({
            id_persona: payment.id,  // Asegúrate de que el nombre coincide con el del frontend
            id_grupo: payment.rifa,
            status: payment.status,  // Aquí guardas el estado, true o false
        }));
    } else {
        // Si no es un arreglo (en caso de que solo venga un único pago), lo procesamos de forma similar
        formattedPayments = [{
            id_persona: payments.id_persona,  // Ajusta esto si es un solo objeto
            id_grupo: payments.id_grupo,
            status: payments.status,
        }];
    }
    console.log('This is fron formater',formattedPayments);
      try{
                  
        const result = await PaymentModel.updatePayment({ payments: formattedPayments });
             
                  res.status(200).json({
                      timestamp: new Date().toLocaleString(),
                      success: true,
                      stCode: "01",
                      message: 'Users updated succesfully',
                      // data: payments,
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

}