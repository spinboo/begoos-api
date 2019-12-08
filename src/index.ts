import express from 'express';
import bodyParser from 'body-parser'
import morgan from 'morgan';
import fs from 'fs';
import jwt from 'jsonwebtoken';

import usersRouter from './users';

// Set up
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// user routes
app.use('/api/users', usersRouter);



app.listen(3000, () => console.log('Listening on port 3000'));