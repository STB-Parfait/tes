const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Cria a instância do Sequelize apontando para um arquivo SQLite local.
// O arquivo será criado automaticamente ao sincronizar.
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'),
    logging: false, // desabilita logs SQL no console; pode habilitar se quiser
});

// Função para testar a conexão (opcional)
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com SQLite bem-sucedida.');
    } catch (error) {
        console.error('Não foi possível conectar ao SQLite:', error);
    }
}
testConnection();

// Importa os modelos (vamos criar em seguida)
const Course = require('./course')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes);

// Se houver relacionamentos, defina aqui. (Não precisamos aqui, pois são entidades independentes por enquanto)

module.exports = {
    sequelize,
    Sequelize,
    Course,
    User,
};
