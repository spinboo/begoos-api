import makeAuthManager from './auth-manager';
import makeAuthHandler from './auth-handler';
import makeAuthRoutes from './auth-routes';

const authManager = makeAuthManager();
const authHandler = makeAuthHandler({ authManager });
const authRouter = makeAuthRoutes({ authHandler });

export default authRouter;


