const mongoose = require('mongoose');

const UserModel = require('../models/userModel');

const {
  saveUser,
  connectMongoDb,
  disconnectMongoDb,
  findUser,
} = require('./db');

jest.mock('./db.js');

beforeAll(async () => {
  return await connectMongoDb();
});

describe('db.test.js', () => {
  describe('database operations', () => {
    test('it should save user to the database', async () => {
      const newUser = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        firstName: 'Erik',
        lastName: 'Demchak',
        address: 'Test street 1',
        city: 'Test city',
        state: 'Test state',
        zipCode: '123 45',
        email: 'test@example.com',
        password: '123',
      });

      const user = await saveUser(newUser);
      expect(user.firstName).toEqual('Erik');
      expect(user.lastName).toEqual('Demchak');
      expect(user.address).toEqual('Test street 1');
      expect(user.city).toEqual('Test city');
      expect(user.state).toEqual('Test state');
      expect(user.zipCode).toEqual('123 45');
      expect(user.email).toEqual('test@example.com');
      expect(user.password).toEqual('123');
    });

    test('it should find the user', async () => {
      const userDto = {
        firstName: 'Erik',
        lastName: 'Demchak',
      };

      const user = await findUser(userDto);

      expect(user.firstName).toEqual('Erik');
      expect(user.lastName).toEqual('Demchak');
    });
  });
});

afterAll(async () => {
  return await disconnectMongoDb();
});
