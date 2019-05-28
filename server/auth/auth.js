const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

//Create a passport middleware to handle user registration
passport.use('signup', new localStrategy({
    passReqToCallback: true,
    usernameField : 'email',
    passwordField : 'password'
  }, async (req, email, password, done) => {
      try {
        //console.log(req.file.url, "we are here")
        let profileImage = req.file.url
        let firstName = req.body.firstName
        let lastName = req.body.lastName
        //Save the information provided by the user to the the database
        const user = await User.create({ profileImage, firstName, lastName, email, password });
        //Send the user information to the next middleware
        return done(null, user);
      } catch (error) {
        done(error);
      }
  }));
  
  //Create a passport middleware to handle User login
  passport.use('login', new localStrategy({
    usernameField : 'email',
    passwordField : 'password'
  }, async (email, password, done) => {
    try {
      //console.log('we are here', email)
      //Find the user associated with the email provided by the user
      let user = await User.findOne({
        where:{ email },
      });
      //console.log('finding user', user)
      if( !user ){
        //If the user isn't found in the database, return a message
        return done(null, false, { message : 'User not found'});
      }
      //Validate password and make sure it matches with the corresponding hash stored in the database
      //If the passwords match, it returns a value of true.
      //console.log(user)
      const validate = await user.validPassword(password);
      if( !validate ){
        return done(null, false, { message : 'Wrong Password'});
      }
      user = await User.findOne({
        where:{ email },
        attributes: {exclude: ['password']}
      });
      //Send the user information to the next middleware
      return done(null, user, { message : 'Logged in Successfully'});
    } catch (error) {
      return done(error);
    }
  }));

  passport.use(new JWTstrategy({
    //secret we used to sign our JWT
    secretOrKey : 'pothers',
    //we expect the user to send the token as a query paramater with the name 'secret_token'
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken()
  }, async (token, done) => {
    try {
      //Pass the user details to the next middleware
      return done(null, token.id);
    } catch (error) {
      done(error);
    }
  }));