const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

// POST /auth/login  → recebe email e password; retorna token e dados do user
router.post('/login', authController.login);

// POST /auth/logout → API “dummy” pra front chamar; só retorna sucesso
router.post('/logout', authController.logout);

// GET /auth/profile -> Retorna o usuário pelo JWT
router.get('/profile', ensureAuthenticated, authController.getProfile);

module.exports = router;
