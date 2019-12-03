// import makeDb from '../db';
// import makeUserRepository from './users-repository';
import makeUserEndPointHandler from './users-handler';

// const database = makeDb();
// const userRepository =  makeUserRepository({ database });
const userEndPointHandler = makeUserEndPointHandler();

export default userEndPointHandler;
