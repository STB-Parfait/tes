// /routes/courseVideoRoutes.js

const express = require('express');
const router = express.Router();
const { upload } = require('../controllers/uploadController');
const courseVideoController = require('../controllers/courseVideoController');
const { ensureAuthenticated, ensureAdmin } = require('../middlewares/authMiddleware');

// 1. Upload de vídeo (só admin pode subir vídeo para um curso)
//    → Recebe: courseId, name, description, e campo file="video"
router.post(
    '/upload',
    ensureAuthenticated,
    ensureAdmin,
    upload.single('video'),
    courseVideoController.uploadVideo
);

// 2. Listar todos os vídeos de um curso (público, ou pode exigir login)
router.get('/course/:courseId', courseVideoController.getVideosByCourse);

// 3. (Opcional) Deletar vídeo (só admin)
router.delete(
    '/:id',
    ensureAuthenticated,
    ensureAdmin,
    courseVideoController.deleteVideo
);

module.exports = router;
