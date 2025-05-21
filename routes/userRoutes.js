const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST /users         → criar um usuário
router.post('/', userController.createUser);

// GET /users          → listar todos os usuários
router.get('/', userController.getAllUsers);

// GET /users/:id      → buscar usuário por ID
router.get('/:id', userController.getUserById);

// PUT /users/:id      → atualizar usuário por ID
router.patch('/:id', userController.updateUser);

// DELETE /users/:id   → deletar usuário por ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
