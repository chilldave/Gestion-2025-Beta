export const membersQuery = {
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
    `
};