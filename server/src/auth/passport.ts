import passport from "passport";
import passportJWT from "passport-jwt";
import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import { SECRET_KEY } from "../utils/values";
import User from "../database/models/userModel";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username }).lean();
      if (!user) {
        return done(null, false, {
          message: "Username or password incorrect.",
        });
      }

      if (!bcrypt.compareSync(password, user.password ?? "")) {
        return done(null, false, {
          message: "Username or password incorrect.",
        });
      }
      delete user.password;
      return done(null, { ...user }, { message: "Logged In Successfully" });
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_KEY,
    },
    async (jwtPayload, done) => {
      try {
        console.log("HERE", jwtPayload);
        const user = await User.findById(jwtPayload._id).lean();
        if (!user) {
          return done(null, false);
        }

        delete user.password;
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;
