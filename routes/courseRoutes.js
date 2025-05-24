const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { ensureAuthenticated, ensureAdmin } = require('../middlewares/authMiddleware');

// Rotas públicas (listar e buscar)
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);

// Rotas restritas a administradores (criar, atualizar, deletar)
// Primeiro verifica se está autenticado, depois se é admin
router.post('/', ensureAuthenticated, ensureAdmin, courseController.createCourse);
router.put('/:id', ensureAuthenticated, ensureAdmin, courseController.updateCourse);
router.delete('/:id', ensureAuthenticated, ensureAdmin, courseController.deleteCourse);

module.exports = router;
