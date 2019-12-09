import makeDb from '../db';
import makeUserRepository from './users-repository';
import makeUsersManager from './users-manager';
import makeUsersHandler from './users-handler';
import makeUsersRoutes from './users-routes';

const pool = makeDb();
const userRepository = makeUserRepository({ pool });
const usersManager = makeUsersManager({ userRepository });
const usersHandler = makeUsersHandler({ usersManager })
const usersRouter = makeUsersRoutes({ usersHandler });

export default usersRouter;
