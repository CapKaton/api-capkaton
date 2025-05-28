import mysql from 'mysql2/promise';

const con = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "1234",
    database: process.env.DB_NAME || "CAPKATON",
    typeCast: function (field, next) {
        if (field.type === 'TINY' && field.length === 1) {
            return (field.string() === '1');
        } else if(field.type.includes('DECIMAL')){
            return Number(field.string());
        } else {
            return next();
        }
    }
});

export { con };