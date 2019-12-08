import jwt from 'jsonwebtoken';
import passport from 'passport';
import passportJWT from 'passport-jwt';

export const signUp = (req: any, res: any) => {
  const user = {
    email: req.body.email,
    password: req.body.password //TODO encriptar la password hasheada
  };

  // TODO llamamos a crear un usuario en la base de datos con la password hasheada, brypt

  // TODO si ha error devolvemos mensaje de error
  // TODO si no hay error devolvemos un 200 con el token, podemos utilizar un servicio para crear el token;
}

export const signIn = (req: any, res: any) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user
      });
    }

    req.login(user, { session: false }, (err: any) => {
      if (err) {
        res.send(err);
      }

      // generate a signed json web token with the contents of user object an return it in the response
      const token = jwt.sign(user, 'secret');
      return res.json({ user, token });
    });
  });
}



const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
},
  (jwtPayload, cb) => {
    // TODO buscar el usuario en la base de datos si es necesario, se puede omitir si el jwt payload lleva todo lo que necesitamos
  })
)

