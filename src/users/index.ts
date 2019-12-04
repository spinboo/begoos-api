import makeDb from '../db';
import makeUserRepository from './users-repository';
import makeUserEndPointHandler from './users-handler';

const pool = makeDb();
const userRepository =  makeUserRepository({ pool });
const userEndPointHandler = makeUserEndPointHandler({ userRepository });

export default userEndPointHandler;
