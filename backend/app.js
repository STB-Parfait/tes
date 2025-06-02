// app.js
const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const cors = require('cors');

const app = express();

app.use(cors("*"));

// 1. Middleware para ler JSON no corpo das requisições
app.use(express.json());

// 2. Expor a pasta de uploads como rota estática
//    – Qualquer arquivo em volumes/uploads/<nome> será servido em /uploads/<nome>
app.use(
    '/uploads',
    express.static(path.join(__dirname, 'volumes', 'uploads'))
);

// 3. Importar os arquivos de rota
const courseRoutes       = require('./routes/courseRoutes');
const userRoutes         = require('./routes/userRoutes');
const authRoutes         = require('./routes/authRoutes');
const courseVideoRoutes  = require('./routes/courseVideoRoutes');

// 4. Montar as rotas com seus respectivos prefixos
app.use('/courses',       courseRoutes);
app.use('/users',         userRoutes);
app.use('/auth',          authRoutes);
app.use('/courseVideos',  courseVideoRoutes);

// 5. Rota raiz apenas para verificar que o servidor está no ar
app.get('/', (req, res) => {
    res.send('API acadêmica rodando com suporte a upload de vídeos.');
});

// 6. Sincronizar o Sequelize e iniciar o servidor
const PORT = process.env.PORT || 3000;
sequelize
    .sync() // cria as tabelas que não existirem (incluindo courseVideos)
    .then(() => {
        console.log('Banco sincronizado.');
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao sincronizar banco:', err);
    });
