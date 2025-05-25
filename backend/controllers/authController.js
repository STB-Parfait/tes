const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mesmo secret do middleware (ideal em env var)
const JWT_SECRET = process.env.JWT_SECRET || 'secreto_muito_forte_para_jwt';
const JWT_EXPIRES_IN = '1d'; // token válido por 1 dia

// 1. Login: compara credenciais, retorna token
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // 1.1. Buscar usuário por email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // 1.2. Comparar senha plaintext com hash
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // 1.3. Gerar payload com id e role (pode incluir mais dados, se quiser)
        const payload = {
            id: user.id,
            role: user.role,
        };

        // 1.4. Gerar o token
        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        // 1.5. Retornar o token e os dados básicos do user
        return res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ error: 'Erro interno no login.' });
    }
};

// Logout: na verdade, basta o client “esquecer” o token.
// Porém, se quiser, pode ter essa rota pra o front chamar e simplesmente retornar sucesso.
exports.logout = (req, res) => {
    // Como JWT é stateless, não há sessão a destruir no servidor.
    // O cliente deve apagar o token armazenado (localStorage, etc).
    return res.status(200).json({ message: 'Logout realizado (delete o token no client).' });
};

exports.getProfile = async (req, res) => {
    try {
        // req.userId foi preenchido no middleware ensureAuthenticated
        const user = await User.findByPk(req.userId, {
            attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao obter perfil do usuário:', error);
        return res.status(500).json({ error: 'Erro interno ao obter perfil.' });
    }
};