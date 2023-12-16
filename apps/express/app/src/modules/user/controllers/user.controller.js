const UserService = require('../services/user.service');
const { ResponseService } = require('@modules/common/services/response.service');
const yup = require("yup");

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      return res.json(users);
    } catch (error) {
      return ResponseService.return500(res);
    }
  }

  static async getUserById(req, res) {
    const { id } = req.params;

    try {
      yup.object().shape({
        id: yup.number().required()
      }).validateSync({ id });

      const user = await UserService.getUserById(id);

      if (!user) {
        return ResponseService.return404(res);
      }

      return res.json(user);
    } catch (error) {
      return ResponseService.returnCatchError(res, error);
    }
  }

  static async createUser(req, res) {
    const { name, email } = req.body;

    try {
      yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required()
      }).validateSync({ name, email });

      const newUser = await UserService.createUser({ name, email });
      return res.status(201).json(newUser);
    } catch (error) {
      return ResponseService.returnCatchError(res, error);
    }
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
      yup.object().shape({
        id: yup.number().required(),
        name: yup.string(),
        email: yup.string().email()
      }).validateSync({id, email, name});

      const user = await UserService.updateUser(id, { name, email });

      if (!user) {
        return ResponseService.return404(res);
      }

      return res.json(user);
    } catch (error) {
      return ResponseService.returnCatchError(res, error);
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;

    try {
      yup.object().shape({
        id: yup.number().required()
      }).validateSync({id});

      const deleted = await UserService.deleteUser(id);

      if (!deleted) {
        return ResponseService.return404(res);
      }

      return res.status(204).send(); // Trả về mã trạng thái 204 (No Content)
    } catch (error) {
      return ResponseService.returnCatchError(res, error);
    }
  }
}

module.exports = UserController;
