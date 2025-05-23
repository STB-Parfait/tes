const express = require('express');
const app = express();
const session = require('express-session');
const { sequelize } = require('./models');

// 1. Middlewares
app.use(express.json()); // para interpretar JSON no corpo das requisições

// 1.1
app.use(
    session({
        secret: 'chave-secreta-super-segura',  // substitua por algo forte em produção
        resave: false,        // não regrava a sessão se nada mudou
        saveUninitialized: false, // não salva sessão vazia
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 dia de vida (em milissegundos)
            // secure: true,           // só via HTTPS em produção
            // httpOnly: true,
        },
    })
);

// 2. Importar rotas
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes   = require('./routes/authRoutes');

// 3. Montar rotas
app.use('/courses', courseRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// 4. Ponto de verificação simples na raiz
app.get('/', (req, res) => {
    res.send('API acadêmica rodando.');
});

// 5. Sincronizar Sequelize e iniciar servidor
const PORT = process.env.PORT || 3000;
sequelize.sync({ /* force: true */ })
    .then(() => {
        console.log('Banco sincronizado.');
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao sincronizar banco:', err);
    });
