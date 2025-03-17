export const drawsQuery = {
    getDrawsList: `
       SELECT * FROM grupo WHERE estado = 1;
    `,
    getDrawById:`
        SELECT 
            p.id_persona, 
            p.nombre, 
            COUNT(g.id_cuota) AS Manos, 
            count(g.id_cuota) * MAX(c.monto) AS Total
        FROM 
            grupo g
        RIGHT JOIN 
            persona p ON g.id_persona = p.id_persona
        LEFT JOIN 
            cuota c ON  g.id_cuota = c.id_cuota
        WHERE 
            p.id_persona = ?;
    `,
    getDrawFinalList:`
        SELECT 
	        g.id_grupo, p.nombre, 
            DATE_FORMAT(g.fecha_rifa, '%d-%m-%Y') AS fecha_rifa, 
	        YEAR(g.fecha_rifa) AS anho,
                CASE 
                    WHEN  g.estado = 0 THEN 'Pendiente'
                    WHEN g.estado = 1 THEN 'Asignado'
                END AS estado
        FROM 
	        grupo g
        INNER JOIN 
	        persona p ON g.id_persona = p.id_persona
        WHERE 
            g.fecha_rifa IS NOT NULL
        GROUP BY 
	        g.id_grupo, p.nombre, g.fecha_rifa
        ORDER BY
	        g.fecha_rifa ASC;
    `,  
    getAvailableDraws:
    `
        SELECT
            id_grupo AS Id,
	        CONCAT (g.nombre , ' -  ', g.fecha_rifa) AS Disponibles 
        FROM 
	        grupo g
        WHERE 
	        g.estado = 0;
    `
};