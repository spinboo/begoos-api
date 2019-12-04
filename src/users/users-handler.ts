import { standardApiRequest } from '../helpers/adapt-request'; 
import makeHttpError from '../helpers/http-error';

 // TODO create and import getUsers, createUser and makeHttpError functions

const makeUsersHandler = ({ userRepository }: any) => {
  return async function userController (httpRequest: standardApiRequest) {
    switch (httpRequest.method) {
      case 'GET':
        return getUsers(httpRequest);

      case 'POST': 
        return createUser(httpRequest);
          
      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage:  `${httpRequest.method} method not allowed.`
        });
      }
  }

  async function getUsers (httpRequest: standardApiRequest) {
    const { id } = httpRequest.pathParams || {};
    try {
      const result = id
        ? await userRepository.getUserById({ userId: id })
        : await userRepository.getUsers();
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        name: 'users',
        statusCode:200,
        data: JSON.stringify(result[0])
      };
    }
    catch(e) {
      console.log(e);
    }

    
  }

  async function createUser (httpRequest: standardApiRequest) {
    let userInfo = httpRequest.body;
    console.log(userInfo);
    // if (!userInfo) {
    //     return makeHttpError({
      //         statusCode: 400,
      //         errorMessage: 'Bad request. No POST body.'
      //     })
      // }

      // if (typeof httpRequest.body === 'string') {
      //     try {
      //         userInfo = JSON.parse(userInfo);
      //     } catch {
      //         return makeHttpError({
      //             statusCode: 400,
      //             errorMessage: 'Bad request. POST body must be valid JSON'
      //         })
      //     }
      // }
      
      // try {
      //     // const user = makeUser(userInfo);
      //     const result = await userRepository.add(userInfo)
      //     return {
      //         headers: {
      //             'Content-Type': 'application/json'
      //         },
      //         statusCode: 201,
      //         data: JSON.stringify(result)
      //     }
      // } catch (e) {
      //     return makeHttpError({
      //         statusCode: 400,
      //         errorMessage: ''
      //     })
      // }
  }
}

export default makeUsersHandler;



