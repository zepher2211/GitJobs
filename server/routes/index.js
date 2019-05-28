var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize')
const User = require('../models/user')
const pry = require('pryjs')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
  });
  const cloudStorage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "gitjobs",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 300, height: 300, crop: "limit" }]
  });
  const parser = multer({ storage: cloudStorage });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  //eval(pry.it)
});

//When the user sends a post request to this route, passport authenticates the user based on the
//middleware created previously
router.post('/signup', parser.single("image"), (req, res, next) => {
  next()
}, passport.authenticate('signup', { session : false }) , async (req, res, next) => {
  res.json({ 
    message : 'Signup successful',
    //user : req.user 
  });
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {     try {
      if(err || !user){
        const error = new Error(err, user)
        return next(error);
      }
      req.login(user, { session : false }, async (error) => {
        // console.log(req.sessionID)
        if( error ) return next(error)
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the email and id
        // const body = { id : user.id };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ id : user.id },'pothers');
        //Send back the token to the user
        //console.log(req.sessionID)
        return res.json({ token, user });
      });     } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
