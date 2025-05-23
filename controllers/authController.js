const { User } = require('../models');
const bcrypt = require('bcrypt');

// 1. Login: verifica email e senha; se OK, cria sessão
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // 1.1. Buscar usuário por email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // 1.2. Comparar senha
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // 1.3. Se validou, salvar id do usuário na sessão
        req.session.userId = user.id;
        req.session.userRole = user.role;

        // Retornamos dados mínimos (sem senha):
        const { id, name, email: userEmail, role } = user;
        return res.status(200).json({ id, name, email: userEmail, role });
    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ error: 'Erro interno no login.' });
    }
};

// 2. Logout: destrói a sessão
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Erro ao destruir sessão:', err);
            return res.status(500).json({ error: 'Falha ao fazer logout.' });
        }
        // Opcionalmente limpar cookie no cliente:
        res.clearCookie('connect.sid'); // nome padrão do cookie de sessão
        return res.status(200).json({ message: 'Deslogado com sucesso.' });
    });
};

// 3. Verificar se o usuário está logado (middleware)
exports.ensureAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        // o usuário está autenticado
        return next();
    }
    return res.status(401).json({ error: 'Não autenticado.' });
};

exports.ensureAdmin = (req, res, next) => {
    if (req.session.userRole === 'admin') {
        return next();
    }
    return res.status(403).json({ error: 'Acesso negado: requer perfil de administrador.' });
};
