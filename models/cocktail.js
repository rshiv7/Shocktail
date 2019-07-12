module.exports = function(sequelize, DataTypes) {
    var Cocktail = sequelize.define("Cocktail", {
        name: {
            type: DataTypes.STRING,
            validate: {
                notNull: true
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            references: 'users',
            referencesKey: "id"
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
                notNull: true
            }
        });
    };

    return Cocktail;
}