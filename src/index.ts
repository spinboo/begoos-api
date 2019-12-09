import express from 'express';
import bodyParser from 'body-parser'
import morgan from 'morgan';

import usersRouter from './users';
import authRouter from './auth';

// Set up
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api', authRouter);
app.use('/api/users', usersRouter);

app.listen(3000, () => console.log('Listening on port 3000'));