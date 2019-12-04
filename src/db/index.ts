import mysql from 'mysql2/promise';

const makeDb = () => {
  const config = {
    host: 'localhost',
    user: 'root',
    password: 'Begoos$76',
    database: 'begoos',
  };

  const pool = mysql.createPool(config);

  return pool;
}

const pool = makeDb();
const insertUser = async (pool: mysql.Pool) => await pool.query('SELECT * from users');
const result = insertUser(pool);

export default makeDb;