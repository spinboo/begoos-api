import express from 'express';


const makeUsersRoutes = ({ usersHandler }: any) => {
  return async function userRoutes () {
    const userRoutes = express.Router();

    userRoutes.route('/')
      .get(usersHandler)
      .post(usersHandler)

    userRoutes.route('/:id')
      .get(usersHandler)
      .delete(usersHandler)
  }
}

export default makeUsersRoutes;