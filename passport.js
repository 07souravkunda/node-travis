const passport = require("passport"),
  OAuth2Strategy = require("passport-google-oauth20").Strategy;
const User = require("./userModel");

passport.use(
  new OAuth2Strategy(
    {
      //   authorizationURL: "https://www.google.com/oauth2/authorize",
      //   tokenURL: "https://www.google.com/oauth2/token",
      clientID:
        "746316035805-sdvj15sq8jhdkgpnitppokg5jpg3dj66.apps.googleusercontent.com",
      clientSecret: "Trm9blZszwaKvIOL6mPcikAC",
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    async function(accessToken, refreshToken, profile, done) {
      console.log("hello");
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          console.log(user);
          console.log("noooooo");

          return done(null, user._id);
        } else {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName
          });
          console.log("helkshdfj");
          console.log(user);
          done(null, user._id);
        }
      } catch (er) {
        console.log("er", er);
      }
      //   User.findOrCreate(..., function(err, user) {
      //     done(err, user);
      //   });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
  done(null, user);
});
module.exports = passport;
