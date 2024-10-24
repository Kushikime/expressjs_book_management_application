const express = require('express');
const router = express.Router();

const { isEmpty } = require('../utils/utils');
const validateSignUpBody = require('./validators/signUpValidation');
const validateLoginBody = require('./validators/loginValidation');
const { signUpPost, loginPost } = require('../services/userService');

router.get('/', (req, res) => {
  session = req.session;
  res.render('home', { pageName: 'Home', session });
});

router.get('/about', (req, res) => {
  session = req.session;
  res.render('about', { pageName: 'About', session });
});

router.get('/login', (req, res) => {
  res.render('login', { pageName: 'Login' });
});

router.post('/login', async (req, res) => {
  const errors = validateLoginBody(req.body);

  if (isEmpty(errors)) {
    try {
      const result = await loginPost(req.body);
      req.session.user = result.data.user;
      req.session.accessToken = result.data.accessToken;
      return res.render('home', {
        pageName: 'Home',
        message: 'Successfully logged in',
        session: req.session, // Pass the updated session
      });
    } catch (err) {
      console.error('Login error:', err); // More informative error logging
      return res.status(500).render('login', {
        pageName: 'Login',
        message: 'Failed to log in',
        error: 'An error occurred during login.', // General error message to the user
      });
    }
  }

  return res.status(400).render('login', {
    pageName: 'Login',
    message: 'Failed login',
    errors,
    body: req.body,
  });
});

router.get('/register', (req, res) => {
  res.render('register', { pageName: 'Sign Up' });
});

router.post('/register', (req, res) => {
  const errors = validateSignUpBody(req.body);

  if (isEmpty(errors)) {
    signUpPost(req.body); // Consider adding error handling here as well
    return res.render('register', {
      pageName: 'Sign Up',
      message: 'Successfully registered',
    });
  }

  return res.status(400).render('register', {
    pageName: 'Sign Up',
    message: 'Failed registration',
    errors,
    body: req.body,
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(null);

  res.render('home', { pageName: 'Home', session: req.session });
});

router.post('/register', (req, res) => {
  if (!req.body || isEmpty(req.body)) {
    return res.status(400).render('register', {
      pageName: 'Sign Up',
      error: 'Request body cannot be empty',
    });
  }

  const errors = validateSignUpBody(req.body);
  if (isEmpty(errors)) {
    signUpPost(req.body);
    return res.render('register', {
      pageName: 'Sign Up',
      message: 'Successfully registered',
    });
  }

  return res.status(400).render('register', {
    pageName: 'Sign Up',
    message: 'Failed resgistration',
    errors,
    body: req.body,
  });
});

module.exports = router;
