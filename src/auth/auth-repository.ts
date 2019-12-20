import { Pool } from 'mysql2/promise';

const makeAuthRepository = ({ pool }: { pool: Pool }) => {
  const findByEmail = async (userEmail: string) => {
    return await pool.query('SELECT email, user_password FROM users WHERE email= ?', [userEmail]);
  }

  const add = async ({ ...userInfo }) => {
    const { email, password } = userInfo;
    return await pool.query('INSERT INTO users (email,user_password) VALUES (?, ?)', [email, password]);
  }

  return Object.freeze({
    findByEmail,
    add
  });
}

export default makeAuthRepository;