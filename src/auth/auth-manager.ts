import jwt from 'jsonwebtoken';
import moment from 'moment';
import fs from 'fs';

const privateKey = fs.readFileSync('./private.key', 'utf8');
const publicKey = fs.readFileSync('./public.key', 'utf8');

export const createToken = (user: any) => {
  const payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }

  return jwt.sign(payload, privateKey)
}

export const isAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'Do not have authorization' });
  }

  const token = req.headers.authorization.split("")[1];

  const payload = jwt.verify(token, publicKey);

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }

  req.user = payload.sub
  next()
}