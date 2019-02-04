const db = require("../models");

module.exports = {
    // Query to find all students that match criteria selected by the user or all students if no criteria selected
    findByNames: (req, res) => {       
        console.log(req.body);
        db.Names.findAll({
            where: req.body.where,
            include: [db.Addresses]
            
        }).then(data => {
            res.json(data);
        }).catch(err => res.json(err))
    },

    findByAddresses: (req, res) => {       
        console.log(req.body);
        db.Addresses.findAll({
            where: req.body.where,
            include: [db.Names]
        }).then(data => {
            res.json(data);
        }).catch(err => res.json(err))
    }
}