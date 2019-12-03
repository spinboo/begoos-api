import express from 'express';
import bodyParser from 'body-parser'
import handleUsersRequest from './users';
import adaptRequest from './helpers/adapt-request';

console.log(handleUsersRequest);

const app = express();
app.use(bodyParser.json());

app.get('/users/:id', userHandler);

function userHandler (req: any, res: any) {
    const httpRequest = adaptRequest(req);
    handleUsersRequest(httpRequest)
        .then( (response: any) => 
            res
                .set(response.headers)
                .status(response.statusCode)
                .send(response.data)
        )
        .catch(e => res.status(500).end());   
}

app.listen(3000, () => console.log('Listening on port 3000'));