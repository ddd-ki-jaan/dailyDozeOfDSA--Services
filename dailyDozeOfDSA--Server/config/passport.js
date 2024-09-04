import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";
import passport from "passport";
import User from "../models/User/User.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      // options for the google strategy
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.BACKEND_BASE_URL + "/api/v1/auth/google/redirect",
      passReqToCallback: true,
      scope: ["profile", "email"],
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        // console.log("*** google auth cb, profile: ***", profile);
        const { email, name, picture } = profile._json;
        if (!email) return done(new Error("email couldn't be retrieved"), null);

        /** search for the user by email in the db */
        let user = await User.findOne({ email });
        // console.log("*** google auth cb, user: ***", user);
        if (!user) {
          /** If user doesn't exist in the db, then create one */

          let userId = generateUserIdFromEmail(email);
          if (!userId) userId = randomlyGenerateUserId();

          while (true) {
            const userByUserId = await User.findOne({ userId });
            if (!!userByUserId) userId = randomlyGenerateUserId();
            else break;
          }

          const new_user = new User({
            googleId: profile.id,
            email,
            name,
            userId: userId,
            profilePicUrl: picture,
          });

          await new_user.save();
          return done(null, new_user._id);
        } else {
          /** check if the google profile info is attached to the user doc or not,
           * and if not then update the user doc with google profile info
           */

          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }

          return done(null, user._id);
        }
      } catch (error) {
        console.log("*** google auth error: ***", error);
        return done(new Error("something went wrong"), null);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      // options for the google strategy
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:
        process.env.BACKEND_BASE_URL + "/api/v1/auth/github/redirect",
      passReqToCallback: true,
      scope: ["user:email"],
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const profile_json = profile._json;
        const emails = profile.emails;

        if (emails.length === 0) {
          return done(
            new Error("no email is associated with this github account"),
            null
          );
        }

        const primary_email = emails[0].value;
        if (!primary_email) {
          return done(
            new Error("no email is associated with this github account"),
            null
          );
        }

        /** check if an account is already been created with this primary_email */
        /** if not, then create one */
        let user = await User.findOne({ email: primary_email });
        // console.log("*** github auth cb, user: ***", user);
        if (!user) {
          let userId = generateUserIdFromEmail(primary_email);
          if (!userId) userId = randomlyGenerateUserId();

          while (true) {
            const userByUserId = await User.findOne({ userId });
            if (!!userByUserId) userId = randomlyGenerateUserId();
            else break;
          }

          /** If user doesn't exist already in the database then create one */
          let new_user = new User({
            name: profile_json.name || profile_json.login || "",
            email: primary_email,
            userId,
            githubId: profile_json.id,
            githubUsername: profile_json.login,
            profilePicUrl: profile_json.avatar_url,
          });

          await new_user.save();
          return done(null, new_user._id);
        } else {
          /** if user exists in the database then check if the github profile info is attached
           * or not, and if not then update user schema with the github profile info
           */
          if (!user.githubId) {
            user.githubId = profile_json.id;
            user.githubUsername = profile_json.login;
            await user.save();
          }

          return done(null, user._id);
        }
      } catch (error) {
        console.log("*** github auth cb error: ***", error);
        return done(new Error("something went wrong"), null);
      }
    }
  )
);

/** function for generating userId from the email */
function generateUserIdFromEmail(email) {
  if (!email) return null;
  let splittedEmail = email.split("@");
  if (splittedEmail.length === 0) return null;
  let email_prefix = splittedEmail[0];
  if (!email_prefix || email_prefix.length === 0) return null;
  return email_prefix;
}

/** function for randomly generating userId */
function randomlyGenerateUserId() {
  const digits = "0123456789";
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetters = lowerCaseLetters.toUpperCase();
  const chars = digits + lowerCaseLetters + upperCaseLetters;

  let result = "";
  for (let i = 0; i <= 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Serialize user to store in the session
passport.serializeUser((userId, done) => {
  // console.log("serializing user...");
  // console.log("userId: ", userId);
  done(null, userId);
});

// Deserialize user from the session
passport.deserializeUser(async (_userId, done) => {
  try {
    const user = await User.findById(_userId);
    if (!user) {
      return done(new Error("User Not Found!"), null);
    }

    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
