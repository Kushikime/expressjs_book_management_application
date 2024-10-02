require('dotenv').config();
const mongoose = require('mongoose');

const UserModel = require('../models/userModel');

mongoose.connection.on('connected', () =>
  console.log('Successfully connected to MongoDB'),
);

const connectMongoDb = async () => {
  await mongoose.connect(process.env.MONGODB_CONNECTION_URI);
};

const disconnectMongoDb = async () => {
  await mongoose.connection.close();
};

const findUser = async (user) => {
  return await UserModel.findOne(user).exec();
};

const saveUser = async (newUser) => {
  return await newUser.save();
};

module.exports = { connectMongoDb, disconnectMongoDb, findUser, saveUser };
