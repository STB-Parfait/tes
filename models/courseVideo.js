// /models/courseVideo.js

module.exports = (sequelize, DataTypes) => {
    const CourseVideo = sequelize.define(
        'CourseVideo',
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            video: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            courseId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: 'courseVideos',
            timestamps: true,
        }
    );

    CourseVideo.associate = models => {
        CourseVideo.belongsTo(models.Course, {
            foreignKey: 'courseId',
            as: 'course',
        });
    };

    return CourseVideo;
};
