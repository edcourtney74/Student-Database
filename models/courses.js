// Create sequelize object for Student table
module.exports = function (sequelize, DataTypes) {
    var Courses = sequelize.define("Courses", {
        subject: {
            type: DataTypes.STRING,
            allowNull: false
        },
        grade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });
    // Create association between classes and names
    Courses.associate = models => {
        Courses.belongsTo(models.Names)
    };

    return Courses;
}