import { standardApiRequest } from '../helpers/adapt-request'; 
import makeHttpError from '../helpers/http-error';
import { apiResponse } from '../helpers/adapt-request';
 // TODO create and import getUsers, createUser and makeHttpError functions

const makeUsersHandler = () => {
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
    
        // const result = id
        //     ? await userRepository.findById({ userId: id })
        //     : await userRepository.get({ max, before, after });
        
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode:200,
            data: JSON.stringify(id)
        };
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



