// /controllers/courseVideoController.js

const { CourseVideo } = require('../models');
const fs = require('fs'); // Importar fs para deletar arquivos
const path = require('path'); // Importar path para construir caminhos de arquivo

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

        // Salva o caminho relativo no banco, ex: /uploads/timestamp_filename.mp4
        const relativePath = `/uploads/${file.filename}`;

        const newVideo = await CourseVideo.create({
            name,
            description: description || null, // Salva null se a descrição for vazia
            video: relativePath, // Este é o campo que armazena o caminho para o arquivo de vídeo
            courseId: Number(courseId),
        });

        // Retorna o objeto completo do vídeo criado, incluindo o ID e a URL relativa
        return res.status(201).json({
            id: newVideo.id,
            name: newVideo.name,
            description: newVideo.description,
            url: newVideo.video, // Mapeando o campo 'video' do DB para 'url' na resposta, para consistência com o frontend
            courseId: newVideo.courseId,
            createdAt: newVideo.createdAt,
            updatedAt: newVideo.updatedAt,
        });
    } catch (error) {
        console.error('Erro ao fazer upload de vídeo:', error);
        // Verifica se o erro é de validação do Sequelize para dar uma mensagem mais específica
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(e => e.message);
            return res.status(400).json({ error: 'Dados inválidos.', details: messages });
        }
        return res.status(500).json({ error: 'Falha ao salvar vídeo no servidor.' });
    }
};

// 2. Listar vídeos de um curso
exports.getVideosByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        if (isNaN(Number(courseId))) {
            return res.status(400).json({ error: 'ID do curso inválido.' });
        }
        const videos = await CourseVideo.findAll({
            where: { courseId: Number(courseId) },
            // Mapeando o campo 'video' do DB para 'url' na resposta
            attributes: ['id', 'name', 'description', ['video', 'url'], 'courseId', 'createdAt', 'updatedAt'],
            order: [['createdAt', 'ASC']], // Opcional: ordenar por data de criação
        });
        return res.status(200).json(videos);
    } catch (error) {
        console.error('Erro ao buscar vídeos do curso:', error);
        return res.status(500).json({ error: 'Falha ao buscar vídeos do curso.' });
    }
};

// NOVA FUNÇÃO: 3. Atualizar metadados de um vídeo (nome, descrição)
exports.updateVideoMetadata = async (req, res) => {
    try {
        const videoId = req.params.id;
        const { name, description } = req.body;

        if (isNaN(Number(videoId))) {
            return res.status(400).json({ error: 'ID do vídeo inválido.' });
        }

        // Nome é obrigatório para atualização
        if (name === undefined || name.trim() === '') {
            return res.status(400).json({ error: 'O nome do vídeo é obrigatório para atualização.' });
        }

        const video = await CourseVideo.findByPk(videoId);

        if (!video) {
            return res.status(404).json({ error: 'Vídeo não encontrado.' });
        }

        // Atualiza os campos
        video.name = name;
        video.description = description !== undefined ? description : video.description; // Permite limpar a descrição ou manter a antiga

        await video.save(); // Salva as alterações no banco

        // Retorna o vídeo atualizado, mapeando 'video' para 'url'
        return res.status(200).json({
            message: 'Metadados do vídeo atualizados com sucesso.',
            data: {
                id: video.id,
                name: video.name,
                description: video.description,
                url: video.video,
                courseId: video.courseId,
                createdAt: video.createdAt,
                updatedAt: video.updatedAt,
            }
        });
    } catch (error) {
        console.error('Erro ao atualizar metadados do vídeo:', error);
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(e => e.message);
            return res.status(400).json({ error: 'Dados inválidos para atualização.', details: messages });
        }
        return res.status(500).json({ error: 'Falha ao atualizar metadados do vídeo no servidor.' });
    }
};


// 4. Deletar vídeo pelo id
exports.deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            return res.status(400).json({ error: 'ID do vídeo inválido.' });
        }
        const video = await CourseVideo.findByPk(id);

        if (!video) {
            return res.status(404).json({ error: 'Vídeo não encontrado.' });
        }

        // Tenta excluir o arquivo físico do disco
        if (video.video) { // video.video contém o caminho relativo, ex: /uploads/arquivo.mp4
            // Constrói o caminho absoluto para o arquivo
            const absoluteFilePath = path.join(__dirname, '..', 'volumes', video.video.substring(1)); // Remove a '/' inicial de video.video

            fs.unlink(absoluteFilePath, err => {
                if (err && err.code !== 'ENOENT') { // ENOENT = arquivo não encontrado, o que é ok se já foi deletado
                    console.warn(`Falha ao apagar arquivo físico '${absoluteFilePath}':`, err);
                } else if (!err) {
                    console.log(`Arquivo físico '${absoluteFilePath}' deletado com sucesso.`);
                }
            });
        }

        await video.destroy(); // Deleta o registro do vídeo do banco de dados
        return res.status(200).json({ message: 'Vídeo deletado com sucesso.' }); // Mudado de 204 para 200 com mensagem
    } catch (error) {
        console.error('Erro ao deletar vídeo:', error);
        return res.status(500).json({ error: 'Falha ao deletar vídeo.' });
    }
};

// (Opcional) Se precisar buscar um vídeo específico por ID em algum momento
// exports.getVideoById = async (req, res) => {
// try {
// const { id } = req.params;
// const video = await CourseVideo.findByPk(id, {
// attributes: ['id', 'name', 'description', ['video', 'url'], 'courseId', 'createdAt'],
// });
// if (!video) {
// return res.status(404).json({ error: 'Vídeo não encontrado.' });
// }
// return res.status(200).json(video);
// } catch (error) {
// console.error('Erro ao buscar vídeo por ID:', error);
// return res.status(500).json({ error: 'Falha ao buscar vídeo.' });
// }
// };