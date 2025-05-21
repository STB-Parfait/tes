module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
        // Campos do Curso
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        durationHours: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0, // duração em horas
        },
    }, {
        tableName: 'courses',
        timestamps: true, // createdAt e updatedAt automáticos
    });

    return Course;
};
