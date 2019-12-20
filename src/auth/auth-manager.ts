import { standardApiRequest } from "../helpers/adapt-request"
import makeHttpError from '../helpers/http-error';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import moment from 'moment';


const makeAuthManager = ({ authRepository }: any) => {
  return async function authManager(httpRequest: standardApiRequest) {
    switch (httpRequest.path) {
      case '/signin':
        return login(httpRequest);

      case '/signup':
        return register(httpRequest);
    }
  }

  async function login(httpRequest: standardApiRequest) {
    let userInfo = httpRequest.body;

    if (!userInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      })
    }

    if (typeof httpRequest.body === 'string') {
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
      const [user] = await authRepository.findByEmail(userInfo.email);
      const privateKey = fs.readFileSync('src/auth/private.key', 'utf8');

      if (user && user.length !== 0) {
        const arePasswordsEqual = await bcrypt.compare(userInfo.password, user[0].user_password);

        if (arePasswordsEqual) {
          const signOptions = {
            issuer: 'Spinboo',
            subject: user[0].email,
            audience: 'http://www.begoos.com',
            expiresIn: moment().add(14, 'days').unix(),
            algorithm: "RS256"
          };

          const payload = {
            email: user[0].email
          }

          const token = jwt.sign(payload, privateKey, signOptions);

          return {
            headers: {
              'Content-Type': 'application/json'
            },
            name: 'login',
            statusCode: 200,
            data: JSON.stringify(token)
          };
        } else {
          return {
            headers: {
              'Content-Type': 'application/json'
            },
            name: 'login',
            statusCode: 401,
            data: JSON.stringify('User unauthorized')
          };
        }
      } else {
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          name: 'login',
          statusCode: 401,
          data: JSON.stringify('User does not exist or is wrong')
        };
      }
    }
    catch (errorMessage) {
      return makeHttpError({
        statusCode: 400,
        errorMessage
      })
    }
  }

  async function register(httpRequest: standardApiRequest) {
    let userInfo = httpRequest.body;

    if (!userInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      })
    }

    if (typeof httpRequest.body === 'string') {
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
      const doesUserAlreadyExist = await authRepository.findByEmail(userInfo.email);

      if (doesUserAlreadyExist && doesUserAlreadyExist[0].length !== 0) {
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
            data: JSON.stringify('User has been created')
          }
        } catch (errorMessage) {
          return makeHttpError({
            statusCode: 400,
            errorMessage
          });
        }
      }
    }
    catch (errorMessage) {
      return makeHttpError({
        statusCode: 400,
        errorMessage
      })
    }
  }
}

export default makeAuthManager;