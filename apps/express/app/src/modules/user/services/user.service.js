const { User } = require('../database/models');
class UserService {
  static async getAllUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async createUser({name, email}) {
    try {
      const newUser = await User.create({ name, email });
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id, {name, email}) {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        return null;
      }

      await user.update({ name, email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        return false;
      }

      await user.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
