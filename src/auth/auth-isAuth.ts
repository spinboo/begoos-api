import jwt from 'jsonwebtoken';
import moment from 'moment';
import fs from 'fs';

const publicKey = fs.readFileSync('src/auth/public.key', 'utf8');

const isAuth = (req: any, res: any, next: any) => {
  if (!req.headers.authorization && req.headers.authorization === 'Bearer') {
    return res.status(403).send({ message: 'Do not have authorization' });
  }

  console.log(req.headers.authorization);

  const token = req.headers.authorization.split(" ")[1];

  const verifyOptions = {
    issuer: 'Spinboo',
    subject: req.email,
    audience: 'http://www.begoos.com',
    expiresIn: moment().add(14, 'days').unix(),
    algorithm: ["RS256"]
  }

  const payload: any = jwt.verify(token, publicKey, verifyOptions);

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }

  req.user = payload.sub;

  next();
}

export default isAuth