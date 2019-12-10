import express from 'express';

const makeAuthRoutes = ({ authHandler }: any) => {
  const authRoutes = express.Router();

  authRoutes.route('/login')
    .post(authHandler);

  authRoutes.route('/register')
    .post(authHandler);

  return authRoutes;

}

export default makeAuthRoutes;