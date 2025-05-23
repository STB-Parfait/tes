const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /auth/login  → faz login e cria sessão
router.post('/login', authController.login);

// POST /auth/logout → faz logout (destroi sessão)
router.post('/logout', authController.logout);

module.exports = router;
