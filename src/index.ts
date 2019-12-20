import express from 'express';
import bodyParser from 'body-parser'
import morgan from 'morgan';

import usersRouter from './users';
import authRouter from './auth';
import isAuth from './auth/auth-isAuth';
// import passport from 'passport';
// import LocalStrategy from 'passport-local';
// import JwtStrategy from 'passport-jwt';

// Set up
const app = express();

// passport.use(new LocalStrategy.Strategy({
//   usernameField: 'username',
//   passwordField: 'password',
//   session: false
// }, (username, password, done) => {
//   console.log('ejecutando callback verify de estrategia local');
//   // TODO: buscar usuario y comparar passwords plana y hasheada
// }));

// const opts = {};
// opts.jwtFromRequest = JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'SECRET';
// opts.algorithms = 'RS256';

// passport.use(new JwtStrategy.Strategy(opts, (jwt_payload, done) => {
//   console.log('ejecutando callback verify de estrategia jwt');
//   // TODO: Buscar usuario y si existe lo devolvemos para inyectarlo en req.user
// }));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
// app.use(passport.initialize());

const contractsHandler = (req: any, res: any) => {
  res.json(req.user);
}

app.use('/api', authRouter);
app.get('/api/contracts', isAuth, contractsHandler);
app.use('/api/users', usersRouter);

app.listen(3000, () => console.log('Listening on port 3000'));