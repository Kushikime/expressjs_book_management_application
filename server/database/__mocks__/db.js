require('dotenv').config();

const connectMongoDb = async () => {
  console.log('MongoDB mocked connection');
};

const disconnectMongoDb = async () => {
  console.log('MongoDB mocked disconnection');
};

const findUser = async (user) => {
  return Promise.resolve({
    firstName: 'Erik',
    lastName: 'Demchak',
    address: 'Test street 1',
    city: 'Test city',
    state: 'Test state',
    zipCode: '123 45',
    email: 'test@example.com',
    password: '123',
  });
};

const saveUser = async (newUser) => {
  return Promise.resolve({
    firstName: 'Erik',
    lastName: 'Demchak',
    address: 'Test street 1',
    city: 'Test city',
    state: 'Test state',
    zipCode: '123 45',
    email: 'test@example.com',
    password: '123',
  });
};

module.exports = { connectMongoDb, disconnectMongoDb, findUser, saveUser };
