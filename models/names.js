// Create sequelize object for Student table
module.exports = function (sequelize, DataTypes) {
    var Names = sequelize.define("Names", {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DOB: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
    })

    // Create association between addresses and names
    Names.associate = models => {
        Names.hasOne(models.Addresses)
    };

    return Names;
}