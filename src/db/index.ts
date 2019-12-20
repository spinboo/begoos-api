import mysql from 'mysql2/promise';

const makeDb = () => {
  const config = {
    host: 'localhost',
    user: 'root',
    password: 'Spinboo80',
    database: 'begoos',
  };

  const pool = mysql.createPool(config);

  return pool;
}

export default makeDb;