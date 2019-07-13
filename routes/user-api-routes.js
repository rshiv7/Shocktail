
var db = require("../models");

module.exports = function(app){

    // Returns all the data of the users
    app.get("/api/users", function(req, res){
        db.user.findAll({
            include: [db.Post]
        }).then(function(dbUsers){
            res.json(dbUsers);
        });
    });

    // Adds a new user to the model in mysql
    app.post("/api/users", function(req, res){
        db.user.create(req.body).then(function(dbUsers){
            res.json(dbUser);
        });
    });
};