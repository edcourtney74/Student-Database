const db = require("../models");

module.exports = {
    // Query to find all students in the database
    viewAll: (req, res) => {
        db.Students.findAll({})
            .then(data => {
                res.json(data);
            }).catch(err => res.json(err))
    },

    // Query to find all students that match criteria selected by the user
    findStudents: (req, res) => {       
        console.log(req);
        db.Students.findAll(req.body)
        .then(data => {
            res.json(data);
        }).catch(err => res.json(err))
    }
}