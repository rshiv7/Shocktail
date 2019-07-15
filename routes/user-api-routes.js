
var db = require("../models");

module.exports = function(app){

    // Find all users and return to user as a json object
    app.get("/api/users", function(req, res){
        db.user.findAll({}).then(function(dbUser){
            res.json(dbUser);
        });
    });

    // Find one user with id in req.params.id and return as json object
    app.get("/api/users/:id", function(req, res) {
        db.user.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    // Adds a new user to the model in mysql
    app.post("/api/users", function(req, res){
        db.user.create(req.body).then(function(dbUser){
            res.json(dbUser);
        });
    });
};