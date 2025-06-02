// /routes/courseVideoRoutes.js

const express = require('express');
const router = express.Router();
const { upload } = require('../controllers/uploadController'); // Multer para upload de arquivo
const courseVideoController = require('../controllers/courseVideoController');
const { ensureAuthenticated, ensureAdmin } = require('../middlewares/authMiddleware');

// --- ROTAS PARA VÍDEOS DE CURSOS ---
// Presume-se que este router seja montado em '/courseVideos' no seu app principal.
// Ex: app.use('/api/courseVideos', courseVideoRoutes);

// 1. Upload de um novo vídeo para um curso (só admin)
//    Endpoint: POST /courseVideos/upload
//    Corpo: FormData contendo courseId, name, description, e o arquivo de vídeo no campo "video"
router.post(
    '/upload',
    ensureAuthenticated,
    ensureAdmin,
    upload.single('video'), // Middleware do Multer para processar o arquivo "video"
    courseVideoController.uploadVideo // Controller para salvar informações no DB e associar ao curso
);

// 2. Listar todos os vídeos de um curso específico
//    Endpoint: GET /courseVideos/course/:courseId
router.get(
    '/course/:courseId',
    // ensureAuthenticated, // Adicione se esta rota precisar de autenticação para visualização
    courseVideoController.getVideosByCourse
);

// 3. Atualizar metadados de um vídeo existente (nome, descrição) (só admin)
//    Endpoint: PUT /courseVideos/:id  (onde :id é o videoId)
//    Corpo: JSON contendo { "name": "Novo Nome", "description": "Nova Descrição" }
router.put(
    '/:id', // :id aqui refere-se ao ID do vídeo
    ensureAuthenticated,
    ensureAdmin,
    courseVideoController.updateVideoMetadata // << NOVA FUNÇÃO NO CONTROLLER
);

// 4. Deletar um vídeo específico (só admin)
//    Endpoint: DELETE /courseVideos/:id (onde :id é o videoId)
router.delete(
    '/:id', // :id aqui refere-se ao ID do vídeo
    ensureAuthenticated,
    ensureAdmin,
    courseVideoController.deleteVideo
);

// (Opcional) Obter detalhes de um vídeo específico por ID, se necessário para outras funcionalidades
// router.get(
//     '/:id',
//     ensureAuthenticated, // Se necessário
//     courseVideoController.getVideoById // Você precisaria criar esta função no controller
// );

module.exports = router;