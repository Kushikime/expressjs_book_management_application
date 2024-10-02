require('dotenv').config();

const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const { findUser, saveUser } = require('../database/db');

const UserModel = require('../models/userModel');
const mongoose = require('mongoose');

const handleError = (res, status, message) => {
  return res.status(status).json({ message });
};

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

router.post('/register', async (req, res) => {
  try {
    const user = await findUser({ email: req.body.email });
    if (user) {
      return handleError(res, 409, 'User exists');
    }

    const emptyUser = new UserModel({});
    emptyUser._id = new mongoose.Types.ObjectId();
    const newUser = Object.assign(emptyUser, req.body);

    try {
      newUser.password = await hashPassword(req.body.password);
      const userRecord = await saveUser(newUser);
      res
        .status(201)
        .json({ message: 'User successfully registered', ...userRecord });
    } catch (err) {
      return handleError(res, 501, 'Error: ' + err.message);
    }
  } catch (err) {
    return handleError(res, 500, 'Error: ' + err.message);
  }
});

router.post('login', (req, res) => {});

module.exports = router;
