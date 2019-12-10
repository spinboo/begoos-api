import { Pool } from 'mysql2/promise';

const makeUserRepository = ({ pool }: { pool: Pool }) => {
    const get = async () => {
      return await pool.query('SELECT * FROM users');
    }

    const findById = async ({ userId }: { userId: string }) => {
      return await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    }

    const findByEmail = async ({ userEmail }: { userEmail: string }) => {
      return await pool.query('SELECT * FROM users WHERE email= ?', [userEmail]);
    }

    const add = async ({...userInfo }) => {
      const { email, password } = userInfo;
      return await pool.query('INSERT INTO users (email,user_password) VALUES (?, ?)', [email, password]);
    }

    const remove = async({ userId }: { userId: string }) => {
      return await pool.query('DELETE FROM users WHERE id= ?', [userId]);
    }

    return Object.freeze({
      get,
      findById,
      findByEmail,
      add,
      remove
    });
}

export default makeUserRepository;