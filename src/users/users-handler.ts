import adaptRequest from '../helpers/adapt-request';

const makeUsersHandler = ( { usersManager }: any) => {
  return async function usersHandler (req: any, res: any) {
    const httpRequest = adaptRequest(req);
    usersManager(httpRequest)
      .then( (response: any) => 
        res
          .set(response.headers)
          .status(response.statusCode)
          .send(response.data)
      )
      .catch(() => res.status(500).end());   
  }
}

export default makeUsersHandler;