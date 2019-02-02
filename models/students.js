// Create sequelize object for Student table
module.exports = function (sequelize, DataTypes) {
    var Students = sequelize.define("Students", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: true
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: true
        },
        grade: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        GPA: {
            type: DataTypes.DECIMAL (3, 2),
            allowNull: true
        },
    })

    return Students;
}