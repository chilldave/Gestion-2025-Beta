import { param } from 'express-validator';
import {handleDatabaseOperation} from '../utils/handleDB.js'
import {paymentQuery} from '../utils/queries/payments.js';
// import { NotFoundError,DatabaseError } from '../utils/errors.js';

export class PaymentModel {

    static async fetchPayments (){  
        return await handleDatabaseOperation( async (conn)=>{

            const [result] = await conn.query(paymentQuery.getPaymentList);
            return result;
        })
    }

    static async fetchPaymentsById ({id}){  
        return await handleDatabaseOperation( async (conn)=>{

            const params = [`${id}`];

            const [result] = await conn.query(paymentQuery.getPaymentListById, [params]);

            return result;
        })
    }

    static async updatePayment ({payments}){  
        return await handleDatabaseOperation( async (conn)=>{
            let updateQuery = `
            UPDATE gestion_beta.pago
            SET pagado = CASE
        `;
        const queryParams = [];
        payments.forEach(payment => {
            updateQuery += `
                WHEN id_persona = ? AND id_grupo = ? THEN ?
            `;
            // Agregamos los parámetros correspondientes para la consulta
            queryParams.push(payment.id_persona);
            queryParams.push(payment.id_grupo);
            queryParams.push(payment.status); // Convertimos 'true' en 1 y 'false' en 0
        });

        updateQuery += `
        END
        WHERE id_grupo = ? AND id_persona IN (?);
    `;
         // Agregamos los parámetros para WHERE (id_grupo y lista de id_persona)
         const ids = payments.map(payment => payment.id_persona);
         queryParams.push(payments[0].id_grupo); // Suponemos que el id_grupo es el mismo para todos
         queryParams.push(ids);
            // const params = [`${id}`];
            console.log(updateQuery);
            const [result] = await conn.query(updateQuery,queryParams);
            return result;
        })
    }



}

