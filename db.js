module.exports = {
    database: {
        host: process.env.host || 'localhost',
        user: process.env.user || 'ivens772',
        password: process.env.password || '123456',
        database: process.env.database || 'empleados_crud',
       // DB_PORT : process.env.DB_PORT || 3306,
        
    }
}