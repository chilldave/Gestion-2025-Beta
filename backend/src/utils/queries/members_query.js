export const membersQuery = {
    findByNameDB:`
        SELECT   
            * 
        FROM 
            persona p
        WHERE p.nombre = ?
    `,
    getMembers: `
        SELECT 
            p.id_persona, p.nombre, sum(c.monto) AS Monto 
        FROM 
            gestion_beta.persona p
        INNER JOIN 
            gestion_beta.grupo g ON p.id_persona = g.id_persona
        LEFT JOIN 
            gestion_beta.cuota c  ON g.id_cuota = c.id_cuota
        GROUP BY 
            p.id_persona,p.nombre   
    `,
    getMember:`
        SELECT 
            * 
        FROM 
            persona p
        WHERE 
            p.id_persona LIKE ?
    `,
    createMember:`
        INSERT INTO persona (nombre) 
        VALUES (?)
    `,
    updateMember:`
        UPDATE persona 
        SET 
            nombre = ?
        WHERE 
            id_persona = ?
    `,
    deleteMember:`
        DELETE FROM persona 
        WHERE 
            id_persona = ?
    `,
    updateDate:
    `
        UPDATE 
            grupo
        SET
            id_persona = ?,
            estado = 1
        WHERE
            id_grupo = ?
    `,
    updateGroupBeforeDelete:
    `
        UPDATE 
            grupo
        SET
            id_persona = NULL,
            estado = 0
        WHERE
            id_persona = ?
    `,
};