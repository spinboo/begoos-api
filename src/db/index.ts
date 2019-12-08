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

export default makeDb;