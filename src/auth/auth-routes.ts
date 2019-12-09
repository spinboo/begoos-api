import express from 'express';

const makeAuthRoutes = ({ authHandler }: any) => {
  const authRoutes = express.Router();

  authRoutes.route('/login')
    .post(authHandler);

  authRoutes.route('/signup')
    .post(authHandler);

  return authRoutes;

}

export default makeAuthRoutes;