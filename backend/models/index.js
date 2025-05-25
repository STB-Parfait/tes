const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Instância do Sequelize usando SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'),
    logging: false,
});

// Importa os models
const Course = require('./course')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes);
const CourseVideo = require('./courseVideo')(sequelize, DataTypes);

// Cria o objeto db para poder passar para associate()
const db = {
    sequelize,
    Sequelize,
    Course,
    User,
    CourseVideo,
};

// Executa os associate() de cada model, se existir
Object.values(db).forEach(model => {
    if (model?.associate) {
        model.associate(db);
    }
});

// Teste de conexão (opcional)
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com SQLite bem-sucedida.');
    } catch (error) {
        console.error('Não foi possível conectar ao SQLite:', error);
    }
}
testConnection();

module.exports = db;
