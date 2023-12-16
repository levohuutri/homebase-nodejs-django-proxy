const express = require('express');
const UserController = require('../controllers/user.controller'); // Import controller của module "user"

const router = express.Router();

router.get('/', UserController.getAllUsers); // GET
router.get('/:id', UserController.getUserById); // GET:id
router.post('/', UserController.createUser); // POST
router.put('/:id', UserController.updateUser); // PUT:id
router.delete('/:id', UserController.deleteUser); // DELETE

module.exports = router;