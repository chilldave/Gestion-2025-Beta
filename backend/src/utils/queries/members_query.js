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
            * 
        FROM
            persona p   
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