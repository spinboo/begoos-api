import { standardApiRequest } from "../helpers/adapt-request"
import makeHttpError from '../helpers/http-error';
import { logicalExpression } from "@babel/types";

// import jwt from 'jsonwebtoken';
// import moment from 'moment';
// import fs from 'fs';


const makeAuthManager = () => {
  return async function authManager(httpRequest: standardApiRequest) {
    switch (httpRequest.path) {
      case '/login':
        return login(httpRequest);

      case '/singup':
        return signup(httpRequest);
    }
  }

  async function login(httpRequest: standardApiRequest) {
    // TODO funcion de login de usuario
    try {
      const result = {
        token: 'este es tu token',
        user: 'dan'
      }
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        name: 'login',
        statusCode: 200,
        data: JSON.stringify(result)
      };
    }
    catch (e) {
      console.log(e);
    }
  }

  async function signup(httpRequest: standardApiRequest) {
    // TODO funcion de registro de usuario
  }
}

export default makeAuthManager;



// const privateKey = fs.readFileSync('./private.key', 'utf8');
// const publicKey = fs.readFileSync('./public.key', 'utf8');

// export const createToken = (user: any) => {
//   const payload = {
//     sub: user.id,
//     iat: moment().unix(),
//     exp: moment().add(14, 'days').unix()
//   }

//   return jwt.sign(payload, privateKey)
// }

// export const isAuth = (req, res, next) => {
//   if (!req.headers.authorization) {
//     return res.status(403).send({ message: 'Do not have authorization' });
//   }

//   const token = req.headers.authorization.split("")[1];

//   const payload = jwt.verify(token, publicKey);

//   if (payload.exp <= moment().unix()) {
//     return res.status(401).send({ message: 'Token has expired' });
//   }

//   req.user = payload.sub
//   next()
// }