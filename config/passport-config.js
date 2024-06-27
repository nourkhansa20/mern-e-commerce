import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import { User } from '../database/modules/User.js';

const secretKey = 'your_jwt_secret_key'; // Use a strong secret key in production

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  const user = User.findById(jwt_payload.id)
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
}));

export default passport;
