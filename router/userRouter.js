require('dotenv').config();

const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const { findUser, saveUser } = require('../database/db');

const UserModel = require('../models/userModel');
const mongoose = require('mongoose');

router.post('/register', (req, res) => {
  findUser({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        return res.status(409).json({
          message: 'User exist',
        });
      }

      const emptyUser = new UserModel();
      emptyUser._id = new mongoose.Types.ObjectId();
      const newUser = Object.assign(emptyUser, req.body);

      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          return res.status(501).json({ message: 'Error: ' + err.messageF });
        }

        newUser.password = hash;
        const userRecord = await saveUser(newUser);
        res.status(201).json({ message: 'Successful', ...userRecord });
      });
    })
    .catch((err) => ({
      error: {
        message: err.message,
        status: err.status,
      },
    }));
});

router.post('login', (req, res) => {});

module.exports = router;
