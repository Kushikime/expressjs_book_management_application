const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { pageName: 'Home' });
});

router.get('/about', (req, res) => {
  res.render('about', { pageName: 'About' });
});

router.get('/login', (req, res) => {
  res.render('login', { pageName: 'Login' });
});

router.get('/register', (req, res) => {
  res.render('register', { pageName: 'Register' });
});

module.exports = router;
