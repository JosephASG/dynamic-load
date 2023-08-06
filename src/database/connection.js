import sql from 'mssql';
import config from '../config';

const dbSettings = {
    user: 'root',
    password: 'password2332',
    server: 'sql-server',
    // database: config.dbDatabase,
    port: 1433,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}


export async function getConnection() {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.log(error)
    }
}

getConnection();

export { sql };
