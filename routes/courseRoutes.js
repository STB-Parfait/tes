const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { ensureAuthenticated, ensureAdmin} = require('../controllers/authController');

// Rotas públicas (ex.: listar e buscar)
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);

// Rotas protegidas (criar, atualizar, deletar) — só para quem está logado
router.post('/', ensureAuthenticated, ensureAdmin, courseController.createCourse);
router.put('/:id', ensureAuthenticated, ensureAdmin,courseController.updateCourse);
router.delete('/:id', ensureAuthenticated, ensureAdmin,courseController.deleteCourse);

module.exports = router;