import { standardApiRequest } from '../helpers/adapt-request';
import makeHttpError from '../helpers/http-error';

// TODO create and import getUsers, createUser and makeHttpError functions

const makeUsersManager = ({ userRepository }: any) => {
  return async function userManager(httpRequest: standardApiRequest) {
    switch (httpRequest.method) {
      case 'GET':
        return getUsers(httpRequest);

      case 'POST':
        return createUser(httpRequest);

      case 'DELETE':
        return removeUser(httpRequest);

      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        });
    }
  }

  async function getUsers(httpRequest: standardApiRequest) {
    const { id } = httpRequest.pathParams || {};
    try {
      const result = id
        ? await userRepository.findById({ userId: id })
        : await userRepository.get();
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        name: 'users',
        statusCode: 200,
        data: JSON.stringify(result[0])
      };
    }
    catch (e) {
      console.log(e);
    }
  }

  async function createUser(httpRequest: standardApiRequest) {
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
          errorMessage: 'Bad request. POST body must be valid JSON'
        });
      }
    }

    try {
      // const user = makeUser(userInfo);
      const result = await userRepository.add(userInfo);
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
      });
    }
  }

  async function removeUser(httpRequest: standardApiRequest) {
    const { id } = httpRequest.pathParams || {};
    try {
      if (!id) {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request. No POST body.'
        })
      }

      const result = await userRepository.remove({ userId: id });

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        data: JSON.stringify(result)
      }
    }
    catch (e) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request'
      })
    }
  }


}

export default makeUsersManager;



