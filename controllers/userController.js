const { User } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// 1. Criar um novo usuário (aluno ou admin)
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // 1.1. Gerar hash da senha
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword, // <— salva o hash, não o texto puro
            role,
        });

        // Retornamos sem a senha por segurança:
        const { password: _pwd, ...userWithoutPassword } = newUser.toJSON();
        return res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({ error: 'Não foi possível criar o usuário.' });
    }
};

// 2. Listar todos os usuários (sem senha)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
        });
        return res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return res.status(500).json({ error: 'Não foi possível buscar os usuários.' });
    }
};

// 3. Buscar um usuário por ID (sem senha)
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
        });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({ error: 'Erro interno ao buscar o usuário.' });
    }
};

// 4. Atualizar um usuário por ID
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Se veio novo password, gerar hash
        if (password) {
            user.password = await bcrypt.hash(password, saltRounds);
        }

        user.name = name !== undefined ? name : user.name;
        user.email = email !== undefined ? email : user.email;
        user.role = role !== undefined ? role : user.role;

        await user.save();

        const { password: _pwd, ...userWithoutPassword } = user.toJSON();
        return res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({ error: 'Não foi possível atualizar o usuário.' });
    }
};

// 5. Deletar um usuário por ID
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        await user.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        return res.status(500).json({ error: 'Não foi possível deletar o usuário.' });
    }
};
