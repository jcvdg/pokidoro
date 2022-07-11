import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/index.js';

export const applyPassportStrategy = passport => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = process.env.PASSPORT_SECRET;
  passport.use(
    new Strategy(options, (payload, done) => {
      User.findOne({ email: payload.email }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, {
            email: user.email,
            _id: user['_id']
          });
        }
        return done(null, false);
      });
    })
  );
};