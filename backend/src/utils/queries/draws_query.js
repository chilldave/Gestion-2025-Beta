export const drawsQuery = {
    getDrawsList: `
        SELECT 
            p.id_persona, 
            p.nombre, 
            COUNT(g.id_cuota) AS Manos, 
            COUNT(g.id_cuota) * MAX(c.monto) AS Total
        FROM grupo g
        RIGHT JOIN persona p ON g.id_persona = p.id_persona
        LEFT JOIN cuota c ON  g.id_cuota = c.id_cuota
        GROUP BY p.id_persona, p.nombre;
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
            g.fecha_rifa, 
	        YEAR(g.fecha_rifa) AS anho,
            g.estado 
        FROM 
	        grupo g
        RIGHT JOIN 
	        persona p ON g.id_persona = p.id_persona
        WHERE 
            g.fecha_rifa IS NOT NULL
        GROUP BY 
	        g.id_grupo, p.nombre, g.fecha_rifa
        ORDER BY
	        g.fecha_rifa ASC;
    `,  
};