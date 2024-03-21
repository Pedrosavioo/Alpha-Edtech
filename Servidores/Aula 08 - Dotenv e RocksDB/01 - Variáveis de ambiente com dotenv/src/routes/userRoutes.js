const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const permissionVerify = require('./permissionVerify');

// Aplica o middleware permissionVerify em todas as rotas definidas en userRoutes.js
router.use(permissionVerify);

router.get('/all', userController.getAllUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;