const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// POST /courses       → criar um curso
router.post('/', courseController.createCourse);

// GET /courses        → listar todos os cursos
router.get('/', courseController.getAllCourses);

// GET /courses/:id    → buscar curso por ID
router.get('/:id', courseController.getCourseById);

// PUT /courses/:id    → atualizar curso por ID
router.patch('/:id', courseController.updateCourse);

// DELETE /courses/:id → deletar curso por ID
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
