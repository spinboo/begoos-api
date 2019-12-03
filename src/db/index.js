import mysql from 'mysql';
import promisify from 'util';

const makeDb = () => {
    const database = {
        host: 'localhost',
        user: 'root',
        password: 'Begoos$76',
        dbName: 'Begoos',
    };
    const pool = mysql.createPool(database);
    pool.getConnection((err, connection) => {
        if(err) {
            if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('DATABASE CONNECTION WAS CLOSED');
            }
            if(err.code === 'ER_CON_COUNT_ERROR') {
                console.error('DATABASE_HAS_TO_MANY_CONNECTIONS');
            }
            if(err.code === 'ECONNREFUSED') {
                console.error('DATABASE CONNECTION WAS REFUSED');
            }
        }

        if(connection) connection.release();
        console.log('DB is Connected');
        return;
    });

    pool.query = promisify(pool.query);
    return pool;
}

export default makeDb;