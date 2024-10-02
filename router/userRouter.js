const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
  // find user
  // if user -> User exists.
  // if !user -> encryt passowrd, save user record, return accessToken
});

router.post('login', (req, res) => {});

module.exports = router;
