const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated, ensureAdmin } = require('../middlewares/authMiddleware');

// Cadastro pode ser público (ou só admin, dependendo do requisito):
// Se quiser só admin cadastrar qualquer usuário:
// router.post('/', ensureAuthenticated, ensureAdmin, userController.createUser);
//
// Para deixar qualquer um cadastrar aluno (role=student), sem validar token:
router.post('/', userController.createUser);

// Listar todos: só admin
router.get('/', ensureAuthenticated, ensureAdmin, userController.getAllUsers);

// Buscar aluno/admin específico: só quem for admin ou for o próprio usuário
router.get('/:id', ensureAuthenticated, async (req, res, next) => {
    // Se o usuário for admin, pode. Se não, só pode buscar seu próprio id.
    if (req.userRole === 'admin' || Number(req.params.id) === req.userId) {
        return next();
    }
    return res.status(403).json({ error: 'Acesso negado.' });
}, userController.getUserById);

// Atualizar: só admin ou usuário que atualizar seu perfil
router.put('/:id', ensureAuthenticated, async (req, res, next) => {
    if (req.userRole === 'admin' || Number(req.params.id) === req.userId) {
        return next();
    }
    return res.status(403).json({ error: 'Acesso negado.' });
}, userController.updateUser);

// Deletar: só admin (cuidado ao permitir auto-delete)
router.delete('/:id', ensureAuthenticated, ensureAdmin, userController.deleteUser);

module.exports = router;
