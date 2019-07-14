module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            validate: {
                allowNull: false,
                notEmpty: true,
                len: [1, 16]
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                allowNull: false
            }
        },
        age: {
            type: DataTypes.INTEGER,
            validate: {
                allowNull: false,
                notEmpty: true,
                min: 21
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