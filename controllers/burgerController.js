var express = require("express");

var router = express.Router();

//Import the model (burger.js) to use its database functions
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
    res.sendFile(path.join(_dirname, "public/index.html"));
});

//create all our routes and set up logic within those routes where required
router.get("/burgers", function(req, res) {
    burger.all(function(data) {
        res.json({ cats: data });
    });
});

router.post("/burgers", function(req, res) {
    burger.create([
        "burger_name", "devoured"
    ],
    [
        req.body.burger_name, req.body.devoured
    ], function(result) {
        //send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});

router.put("/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0) {
            //if no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.json({ id: req.params.id });
        }
    });
});




//Export routes for server.js to use
module.exports = router;