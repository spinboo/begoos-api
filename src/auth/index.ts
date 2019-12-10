import makeDb from '../db';
import makeAuthRepository from './auth-repository';
import makeAuthManager from './auth-manager';
import makeAuthHandler from './auth-handler';
import makeAuthRoutes from './auth-routes';

const pool = makeDb();
const authRepository = makeAuthRepository({ pool });
const authManager = makeAuthManager({ authRepository });
const authHandler = makeAuthHandler({ authManager });
const authRouter = makeAuthRoutes({ authHandler });

export default authRouter;


