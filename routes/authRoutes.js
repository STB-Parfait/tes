const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /auth/login  → recebe email e password; retorna token e dados do user
router.post('/login', authController.login);

// POST /auth/logout → API “dummy” pra front chamar; só retorna sucesso
router.post('/logout', authController.logout);

module.exports = router;
