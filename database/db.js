require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connection.on('connected', () => console.log('Successfully connected to MongoDB'));

const connectMongoDb = async () => {
  await mongoose.connect(process.env.MONGODB_CONNECTION_URI);
};

module.exports = { connectMongoDb };
