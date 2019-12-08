import express from 'express';

const makeAuthRoutes = ({ authHandler }: any) => {
  return async function authRoutes() {
    const authRoutes = express.Router();

    authRoutes.route('/')
      .post(authHandler)
  }
}

export default makeAuthRoutes;