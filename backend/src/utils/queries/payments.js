export const paymentQuery ={
    getPaymentList:`
        SELECT 
            *
        FROM 
            vista_pagos_personas
    `,
    getPaymentListById:`
        SELECT 
            *
        FROM 
            vista_pagos_personas
        WHERE 
            fecha_rifa = ? 
        ORDER BY 
            Monto DESC, Participante DESC
    `,
    updatePaymentById:`
    UPDATE 
        gestion_beta.pago 
    SET 
        pagado = ? 
    WHERE 
        id_grupo = ? 
    AND 
        id_persona IN (?)
    `

}