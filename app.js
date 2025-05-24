const express = require('express');
const app = express();
const { sequelize } = require('./models');

// 1. Middlewares
app.use(express.json());

// 2. Importar rotas
const courseRoutes = require('./routes/courseRoutes');
const userRoutes   = require('./routes/userRoutes');
const authRoutes   = require('./routes/authRoutes');

// 3. Montar rotas
app.use('/courses', courseRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// 4. Rota raiz (cheque simples)
app.get('/', (req, res) => {
    res.send('API acadêmica rodando com JWT.');
});

// 5. Sincronizar Sequelize e iniciar servidor
const PORT = process.env.PORT || 3000;
sequelize
    .sync()
    .then(() => {
        console.log('Banco sincronizado.');
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao sincronizar banco:', err);
    });
