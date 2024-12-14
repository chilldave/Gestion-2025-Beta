

// const  pool_conection = mysql.pool_conection({
export const connectionData = {
    host: process.env.DB_HOST,         // || 'localhost',
    user: process.env.DB_USER,         // || 'admin',
    password: process.env.DB_PASSWORD, // || 'Mycode@2003./',
    database: process.env.DB_NAME      // || 'gestion_beta'
};
