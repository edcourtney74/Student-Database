const db = require("../models");

module.exports = {
    viewAll: (req, res) => {
        db.Students.findAll({})
            .then(data => {
                res.json(data);
            }).catch(err => res.json(err))
    },

    findStudents: (req, res) => {
        console.log(req);
        db.Students.findAll({
            where: req.body
        }).then(data => {
            res.json(data);
        }).catch(err => res.json(err))
    }
}