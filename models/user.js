module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            validate: {
                allowNull: false,
<<<<<<< HEAD
=======
                // notNull: true,
>>>>>>> 231bed1bee6f37418be203643785df92a638fcd4
                notEmpty: true,
                len: [1, 16]
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
<<<<<<< HEAD
                allowNull: false
=======
                allowNull: false,
                // notNull: true
            }
        },
        age: {
            type: DataTypes.INTEGER,
            validate: {
                allowNull: false,
                // notNull: true,
                notEmpty: true,
                min: 21
>>>>>>> 231bed1bee6f37418be203643785df92a638fcd4
            }
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    });
    return User;
}