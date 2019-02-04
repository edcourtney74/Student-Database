// Create sequelize object for Student table
module.exports = function (sequelize, DataTypes) {
    var Addresses = sequelize.define("Addresses", {
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        county: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: false
        }        
    });
    // Create association between addresses and names
    Addresses.associate = models => {
        Addresses.belongsTo(models.Names)
    };

    return Addresses;
}