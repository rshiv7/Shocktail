module.exports = function(sequelize, DataTypes) {
    var Cocktail = sequelize.define("Cocktail", {
        name: {
            type: DataTypes.STRING,
            validate: {
<<<<<<< HEAD
                allowNull: false
=======
                allowNull: false,
                // notNull: true
>>>>>>> 231bed1bee6f37418be203643785df92a638fcd4
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
<<<<<<< HEAD
                allowNull: false
=======
                allowNull: false,
                // notNull: true
>>>>>>> 231bed1bee6f37418be203643785df92a638fcd4
            }
        });
    };

    return Cocktail;
}