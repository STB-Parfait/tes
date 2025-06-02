// /controllers/uploadController.js

const path = require('path');
const fs = require('fs');

// Configuração do multer
const multer = require('multer');

// Definir destino e nome do arquivo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Caminho absoluto até volumes/uploads
        const uploadPath = path.join(__dirname, '..', 'volumes', 'uploads');
        // Garante que a pasta existe
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Cria um nome único: timestamp + nome original
        const timestamp = Date.now();
        const originalName = file.originalname.replace(/\s+/g, '_'); // Substitui espaços por underscores
        cb(null, `${timestamp}_${originalName}`);
    },
});

// Filtrar apenas vídeos (pode ajustar conforme necessidade)
function fileFilter(req, file, cb) {
    // aceita extensões .mp4, .avi, .mkv (exemplos)
    const allowedMimes = [
        'video/mp4',
        'video/avi',
        'video/x-matroska',
        'video/quicktime', // .mov
        'video/webm',
    ];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de arquivo inválido: só vídeos são permitidos com as extensões corretas.'));
    }
}

// Instância do middleware multer
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 500, // limite de 500MB, ajuste se quiser
    },
});

module.exports = {
    upload,
};