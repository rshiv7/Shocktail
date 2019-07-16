module.exports = function(sequelize, DataTypes) {
    var Review = sequelize.define("Review", {
        review: {
            type: DataTypes.TEXT,
            validate: {
                allowNull: false,
<<<<<<< HEAD
=======
                // notNull: true,
>>>>>>> 231bed1bee6f37418be203643785df92a638fcd4
                notEmpty: true,
                len: [1, 150]
            }
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    });

    Review.associate = function(models) {
        Review.belongsTo(models.User, {
            foreignKey: {
<<<<<<< HEAD
                allowNull: false
=======
                allowNull: false,
                // notNull: true,
>>>>>>> 231bed1bee6f37418be203643785df92a638fcd4
            }
        });
        Review.belongsTo(models.Cocktail, {
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

    return Review;
};