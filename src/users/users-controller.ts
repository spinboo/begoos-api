import { standardApiRequest } from '../helpers/adapt-request'; 
// TODO create and import getUsers, createUser and makeHttpError functions

const makeUsersController = ({ userList }) => {
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
        const { max, before, after } = httpRequest.queryParams || {};
    
        const result = id
            ? await userList.findById({ userId: id })
            : await userList.get({ max, before, after });
        
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode:200,
            data: JSON.stringify(result)
        };
    }

    async function createUser (httpRequest: standardApiRequest) {
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
            } catch {
                return makeHttpError({
                    status: 400,
                    errorMessage: 'Bad request. POST body must be valid JSON'
                })
            }
        }
        
        try {
            const user = makeUser(userInfo);
            const result = await userList.add(user)
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
                errorMessage: ''
            })
        }
    }
}

export default makeUsersController;



