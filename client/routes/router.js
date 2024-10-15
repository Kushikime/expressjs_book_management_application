const express = require('express');
const router = express.Router();

const { isEmpty } = require('../utils/utils');
const validateSignUpBody = require('./validators/signUpValidation');
const validateLoginBody = require('./validators/loginValidation');

router.get('/', (req, res) => {
  res.render('home', { pageName: 'Home' });
});

router.get('/about', (req, res) => {
  res.render('about', { pageName: 'About' });
});

router.get('/login', (req, res) => {
  res.render('login', { pageName: 'Login' });
});

router.post('/login', (req, res) => {
  if (!req.body || isEmpty(req.body)) {
    return res.status(400).render('login', {
      pageName: 'Login',
      error: 'Request body cannot be empty',
    });
  }

  const errors = validateLoginBody(req.body);
  if (isEmpty(errors)) {
    return res.render('about', {
      pageName: 'About',
      message: 'Successfully logged in',
    });
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
  if (!req.body || isEmpty(req.body)) {
    return res.status(400).render('register', {
      pageName: 'Sign Up',
      error: 'Request body cannot be empty',
    });
  }

  const errors = validateSignUpBody(req.body);
  if (isEmpty(errors)) {
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
