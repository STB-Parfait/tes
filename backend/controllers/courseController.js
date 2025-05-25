const { Course, CourseVideo } = require('../models');

// 1. Criar um novo curso
exports.createCourse = async (req, res) => {
    try {
        const { title, description, durationHours } = req.body;
        const newCourse = await Course.create({ title, description, durationHours });
        return res.status(201).json(newCourse);
    } catch (error) {
        console.error('Erro ao criar curso:', error);
        return res.status(500).json({ error: 'Não foi possível criar o curso.' });
    }
};

// 2. Listar todos os cursos
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        return res.status(200).json(courses);
    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        return res.status(500).json({ error: 'Não foi possível buscar os cursos.' });
    }
};

// 3. Buscar um único curso por ID
exports.getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findByPk(id, {
            include: [
                {
                    model: CourseVideo,
                    as: 'videos',
                    attributes: ['id', 'name', 'description', 'video', 'createdAt'],
                },
            ],
        });

        if (!course) {
            return res.status(404).json({ error: 'Curso não encontrado.' });
        }
        return res.status(200).json(course);
    } catch (error) {
        console.error('Erro ao buscar curso:', error);
        return res.status(500).json({ error: 'Erro interno ao buscar o curso.' });
    }
};

// 4. Atualizar um curso por ID
exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, durationHours } = req.body;

        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ error: 'Curso não encontrado.' });
        }

        course.title = title !== undefined ? title : course.title;
        course.description = description !== undefined ? description : course.description;
        course.durationHours = durationHours !== undefined ? durationHours : course.durationHours;

        await course.save();
        return res.status(200).json(course);
    } catch (error) {
        console.error('Erro ao atualizar curso:', error);
        return res.status(500).json({ error: 'Não foi possível atualizar o curso.' });
    }
};

// 5. Deletar um curso por ID
exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ error: 'Curso não encontrado.' });
        }
        await course.destroy();
        return res.status(204).send(); // 204 = sem conteúdo na resposta
    } catch (error) {
        console.error('Erro ao deletar curso:', error);
        return res.status(500).json({ error: 'Não foi possível deletar o curso.' });
    }
};
