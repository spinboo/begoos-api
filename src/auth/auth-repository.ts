import { Pool } from 'mysql2/promise';

const makeAuthRepository = ({ pool }: { pool: Pool }) => {
  const findByEmail = async ({ userEmail }: { userEmail: string }) => {
    return await pool.query('SELECT * FROM users WHERE email= ?', [userEmail]);
  }

  return Object.freeze({
    findByEmail
  });
}

export default makeAuthRepository;