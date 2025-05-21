module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        // Campos do Usuário
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'Deve ser um email válido.',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('student', 'admin'),
            allowNull: false,
            defaultValue: 'student',
        },
    }, {
        tableName: 'users',
        timestamps: true,
    });

    return User;
};
