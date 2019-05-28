const User = require('../models/user')
const express = require('express');

const router = express.Router();

//Lets say the route below is very sensitive and we want only authorized users to have access
router.get('/authorize', async (req, res, next) => {
  let user = await User.findByPk(req.user)
  res.json({
    user: user
  })
})

//Displays information tailored according to the logged in user
router.get('/profile', async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  //return the user information for display
  // let user = await User.findByPk(req.user.id, {
  //   attributes: {exclude: ['password']}
  // })
  //console.log(user)

  res.json({
    user : req.user,
    token : token
  })
});

module.exports = router;