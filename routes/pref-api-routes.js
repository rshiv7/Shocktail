var db = require("../models");

module.exports = function(app) {
    app.get("/api/pref", function(req, res) {
        var query = {};
        if (req.query.user_id) {
            query.userId = req.query.user_id;
        }
        db.Pref.findAll({
            where: query,
            include: [db.User]
        }).then(function(dbPref) {
            res.json(dbPref);
        });
    });
};