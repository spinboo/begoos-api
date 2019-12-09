import express from 'express';

const makeUsersRoutes = ({ usersHandler }: any) => {
  const userRoutes = express.Router();

  userRoutes.route('/')
    .get(usersHandler)
    .post(usersHandler)

  userRoutes.route('/:id')
    .get(usersHandler)
    .delete(usersHandler)

  return userRoutes;
}

export default makeUsersRoutes;