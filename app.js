const express = require('express');
const app = express();
const { sequelize } = require('./models');

// 1. Middlewares
app.use(express.json()); // para interpretar JSON no corpo das requisições

// 2. Importar rotas
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');

// 3. Montar rotas
app.use('/courses', courseRoutes);
app.use('/users', userRoutes);

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
