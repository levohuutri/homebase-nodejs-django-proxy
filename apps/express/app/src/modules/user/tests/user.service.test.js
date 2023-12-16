require("module-alias/register")
const userService = require('./../services/user.service');
const { User, sequelize } = require('../database/models');

describe('userService', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });
  afterAll(async () => {
    await sequelize.close();
  });

  it('create a new user', async () => {
    const userData = {
      name: 'test1',
      email: 'test1@example.com',
    };

    const createdUser = await userService.createUser(userData);

    expect(createdUser).toBeDefined();
    expect(createdUser.name).toBe(userData.name);
    expect(createdUser.email).toBe(userData.email);
  });

  it('get a user by ID', async () => {
    const testUser = await User.create({
      name: 'Test User',
      email: 'testuser@example.com',
    });

    const fetchedUser = await userService.getUserById(testUser.id);

    expect(fetchedUser).toBeDefined();
    expect(fetchedUser.name).toBe(testUser.name);
    expect(fetchedUser.email).toBe(testUser.email);
  });

  it('update a user by ID', async () => {
    const testUser = await User.create({
      name: 'Test User',
      email: 'testuser@example.com',
    });

    const updatedUserData = {
      name: 'Updated User',
      email: 'updateduser@example.com',
    };

    const updatedUser = await userService.updateUser(testUser.id, updatedUserData);

    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe(updatedUserData.name);
    expect(updatedUser.email).toBe(updatedUserData.email);
  });

  it('delete a user by ID', async () => {
    const testUser = await User.create({
      name: 'Test User',
      email: 'testuser@example.com',
    });

    const deletedUser = await userService.deleteUser(testUser.id);

    expect(deletedUser).toBeDefined();
    expect(deletedUser).toBe(true);

    // Verify that the user has been deleted
    const user = await User.findByPk(testUser.id);
    expect(user).toBeNull();
  });
});
