module.exports = function(sequelize, DataTypes) {
    var Cocktail = sequelize.define("Cocktail", {
        name: {
            type: DataTypes.STRING,
            validate: {
                allowNull: false,
                // notNull: true
            }
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    });

    Cocktail.associate = function(models) {
        Cocktail.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                // notNull: true
            }
        });
    };

    return Cocktail;
}