require('dotenv').config();

const express = require('express');
const router = express.Router();

const UserService = require('../services/userService');
const userService = new UserService();

router.post('/login', userService.loginUser);
router.post('/register', userService.registerUser);

module.exports = router;
