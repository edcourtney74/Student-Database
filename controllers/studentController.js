const db = require("../models");

module.exports = {
    // Query to find all students that match criteria selected by the user or all students if no criteria selected
    findStudents: (req, res) => {       
        console.log(req.body);
        db.Names.findAll({
            where: req.body.nameWhere,
            include: [ { 
                model: db.Addresses,
                where: req.body.addressWhere 
            }, {
                model: db.Courses,
                where: req.body.courseWhere
            }],
            
        }).then(data => {
            res.json(data);
        }).catch(err => res.json(err))
    }
}