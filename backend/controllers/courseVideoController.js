// /controllers/courseVideoController.js

const { CourseVideo } = require('../models');

// 1. Upload e cadastro de metadados
exports.uploadVideo = async (req, res) => {
    try {
        const { file } = req;
        const { courseId, name, description } = req.body;

        if (!file) {
            return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
        }
        if (!courseId || !name) {
            return res.status(400).json({ error: 'courseId e name são obrigatórios.' });
        }

        const relativePath = `/uploads/${file.filename}`;

        const newVideo = await CourseVideo.create({
            name,
            description: description || '',
            video: relativePath,
            courseId: Number(courseId),
        });

        return res.status(201).json(newVideo);
    } catch (error) {
        // <-- Garanta que você está imprimindo o erro completo aqui:
        console.error('Erro ao fazer upload de vídeo:', error);
        return res.status(500).json({ error: 'Falha ao salvar vídeo.' });
    }
};

// 2. Listar vídeos de um curso
exports.getVideosByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const videos = await CourseVideo.findAll({
            where: { courseId: Number(courseId) },
            attributes: ['id', 'name', 'description', 'video', 'createdAt'],
        });
        return res.status(200).json(videos);
    } catch (error) {
        console.error('Erro ao buscar vídeos do curso:', error);
        return res.status(500).json({ error: 'Falha ao buscar vídeos.' });
    }
};

// (Opcional) 3. Deletar vídeo pelo id
exports.deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await CourseVideo.findByPk(id);
        if (!video) {
            return res.status(404).json({ error: 'Vídeo não encontrado.' });
        }

        // Opcional: excluir arquivo do disco
        const filePath = video.video.replace('/uploads/', 'volumes/uploads/');
        // ex.: '/uploads/162345_nome.mp4' → 'volumes/uploads/162345_nome.mp4'
        const fs = require('fs');
        fs.unlink(filePath, err => {
            if (err) console.warn('Falha ao apagar arquivo:', err);
        });

        await video.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar vídeo:', error);
        return res.status(500).json({ error: 'Falha ao deletar vídeo.' });
    }
};
