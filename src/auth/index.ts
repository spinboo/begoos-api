import authHandler from './auth-handler';
import makeAuthRoutes from './auth.routes';

const authRouter = makeAuthRoutes({ authHandler });


