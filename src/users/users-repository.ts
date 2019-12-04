import { Pool } from "mysql2/promise";

const makeUserRepository = ({ pool }: { pool: Pool }) => {
    const getUsers = async () => {
      return await pool.query('SELECT * FROM users');
    }

    const getUserById = async ({ userId }: {userId: string }) => {
      return await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    }

    async function addUser () {
      return await pool.query('INSERT INTO users (email,user_password) VALUES ("gus@melitel.es", "12345")');
    }

    return Object.freeze({
      getUsers,
      getUserById,
      addUser
    });
}

export default makeUserRepository;