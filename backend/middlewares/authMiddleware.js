const jwt = require('jsonwebtoken');

// Secret para assinar/verificar o token. Em produção, coloque em variável de ambiente!
const JWT_SECRET = process.env.JWT_SECRET || 'secreto_muito_forte_para_jwt';

// Middleware que verifica o token enviado no cabeçalho Authorization: Bearer <token>
function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }

    // authHeader deve ter o formato "Bearer <token>"
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ error: 'Token inválido.' });
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: 'Formato de token incorreto.' });
    }

    // Verifica e decodifica o token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido ou expirado.' });
        }

        // decoded contém o payload que foi assinado, ex: { id, role, iat, exp }
        req.userId = decoded.id;
        req.userRole = decoded.role;
        return next();
    });
}

function ensureAdmin(req, res, next) {
    // Antes de chamar, o ensureAuthenticated já populou req.userRole
    if (req.userRole === 'admin') {
        return next();
    }
    return res.status(403).json({ error: 'Acesso negado: requer perfil de administrador.' });
}

module.exports = {
    ensureAuthenticated,
    ensureAdmin,
};
