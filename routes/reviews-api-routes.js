//data will get here from review table in db
var db = require("../models");

module.exports = function (app) {

    //it will return all reviews
    app.get("/api/review", function (req, res) {
        db.review.findAll({}).then(
            function (dbReview) {
                res.json(dbReview);
            }
        )
    });
}