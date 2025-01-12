require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { connectMongoDb } = require('../database/db');

const userRouter = require('../router/userRouter');
const healthRouter = require('../router/healthRouter');

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routers
app.use('/health', healthRouter);
app.use('/users', userRouter);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    errorMessage: error.message,
    status: error.status,
  });
});

app.listen(PORT, () => {
  connectMongoDb();
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
