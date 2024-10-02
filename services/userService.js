require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const { findUser, saveUser } = require('../database/db');
const UserModel = require('../models/userModel');

class UserService {
  constructor() {
    this.handleError = this.handleError.bind(this);
    this.hashPassword = this.hashPassword.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  handleError(res, status, message) {
    return res.status(status).json({ message });
  }

  async hashPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }

  async loginUser(req, res) {
    try {
      const user = await findUser({ email: req.body.email });
      if (!user) {
        this.handleError(
          res,
          403,
          'Auth error: no user with given credentials',
        );
      }

      const passCheck = await bcrypt.compare(req.body.password, user.password);
      if (passCheck) {
        user.password = null;
        const accessToken = jsonwebtoken.sign({ user }, process.env.JWT_SECRET);

        return res.status(201).json({
          user,
          accessToken,
        });
      } else {
        this.handleError(
          res,
          403,
          'Auth error: Email or password does not match',
        );
      }
    } catch (err) {
      this.handleError(res, 403, 'Auth error: ' + err.message);
    }
  }

  async registerUser(req, res) {
    try {
      const user = await findUser({ email: req.body.email });
      if (user) {
        return this.handleError(res, 409, 'User exists');
      }

      const emptyUser = new UserModel({});
      emptyUser._id = new mongoose.Types.ObjectId();
      const newUser = Object.assign(emptyUser, req.body);

      try {
        newUser.password = await this.hashPassword(req.body.password);
        const userRecord = await saveUser(newUser);
        res
          .status(201)
          .json({ message: 'User successfully registered', ...userRecord });
      } catch (err) {
        return this.handleError(res, 501, 'Error: ' + err.message);
      }
    } catch (err) {
      return this.handleError(res, 500, 'Error: ' + err.message);
    }
  }
}
module.exports = UserService;
