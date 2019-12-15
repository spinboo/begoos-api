import { standardApiRequest } from "../helpers/adapt-request"
import makeHttpError from '../helpers/http-error';
import bcrypt from 'bcrypt';

// import jwt from 'jsonwebtoken';
// import moment from 'moment';
// import fs from 'fs';


const makeAuthManager = ({ authRepository }: any) => {
  return async function authManager(httpRequest: standardApiRequest) {
    switch (httpRequest.path) {
      case '/login':
        return login(httpRequest);

      case '/register':
        return register(httpRequest);
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

  async function register(httpRequest: standardApiRequest) {
    let userInfo = httpRequest.body;

    if(!userInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      })
    }

    if(typeof httpRequest.body === 'string') {
      try {
        userInfo = JSON.parse(userInfo);
      }
      catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON and not STRING'
        });
      }
    }

    try {
      const result = await authRepository.findByEmail(userInfo.email)[0];

      if(result && result.length === 0 ) {
        throw 'User exists already';
      }
      else {
        console.log('The user is being created');
        const encryptedPassword = await bcrypt.hash(userInfo.password, 10);
        const user = {
          email: userInfo.email,
          password: encryptedPassword
        };
        try {
          const result = await authRepository.add(user);
          return {
            headers: {
              'Content-Type': 'application/json'
            },
            statusCode: 201,
            data: JSON.stringify(result)
          }
        } catch (e) {
          return makeHttpError({
            statusCode: 400,
            errorMessage: 'Bad request. POST body must be valid JSON'
          });
        }
      }
      
      // const result = {
      //   id: 1,
      //   message: 'hello'
      // };

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
        data: JSON.stringify(result)
      }
    }
    catch (e) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. POST body must be valid JSON'
      })
    }
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