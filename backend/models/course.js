// /models/course.js

module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
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
            type: DataTypes.STRING,
            allowNull: true,
        },
        durationHours: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: 'courses',
        timestamps: true,
    });

    Course.associate = models => {
        Course.hasMany(models.CourseVideo, {
            foreignKey: 'courseId',
            as: 'videos',
        });
    };

    return Course;
};
