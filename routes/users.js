const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/User');
const { jwtSecret } = require('../config/');
// Load validators
const registerValidation = require('../validation/register');
const loginValidation = require('../validation/login');

// @endpoint   POST /api/users/register
// @desc       Register users
// @access     public
router.post('/register', async (req, res) => {

  const { errors, isValid } = registerValidation(req.body);
  // check for not valid
  if (isValid > 0) 
    return res.status(400).json(errors);
  
  try {
    // Validate if the user already exist
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      errors.email = 'User already exist!';
      return res.status(400).json(errors);
    }  
    // Grab user information and find the avatar
    const { name, email, password } = req.body,
       avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
    const userInfo = { name, email, avatar, password };
    // Crypt the password
    const salt = await bcrypt.genSalt(10);
    userInfo.password = await bcrypt.hash(password, salt);
    // Create the user
    const newUser = await User.create(userInfo);
    //errors = {};
    res.status(200).send(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// @endpoint   POST /api/users/login
// @desc       Login the user
// @access     public
router.post('/login', async (req, res) => {

  const { errors, isValid } = loginValidation(req.body);

  // check for not valid
  if (isValid > 0) {
    console.log('login', isValid, errors);
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;
  // Find the user
  const user = await User.findOne({ email });
  if (!user) {
    errors.email = 'User not found!'
    return res.status(404).json(errors);
  }

  const validUser = await bcrypt.compare(password, user.password);
  if (!validUser) {
    errors.password = 'Password incorrect';
    return res.status(400).json(errors);
  }
  
  // Generate token
  const { id, name, email: userEmail, avatar } = user;
  // In jwt.sign set the data that you want to get
  const token = await jwt.sign({ id, name, userEmail, avatar }, jwtSecret, { expiresIn: 3600 });
  const bearerToken = `Bearer ${token}`; 
  res.json({ token: bearerToken });

});


// @endpoint   POST /api/users/current
// @desc       Return current user
// @access     private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.send(req.user);
})


module.exports = router;
