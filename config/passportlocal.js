const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const todoUser =  require('../model/Todo.model');
const bcrypt = require("bcrypt");

passport.use(new LocalStrategy(
  {
    usernameField: 'email'
  },
  async (email, password, done) => {
    try {
      const user = await todoUser.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async (id,done) => {
  let user = await todoUser.findById(id);
  done(null, user);
});
