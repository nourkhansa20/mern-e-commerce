import passport from '../config/passport-config.js';

const authenticateJWT = passport.authenticate('jwt', { session: false });

export default authenticateJWT;