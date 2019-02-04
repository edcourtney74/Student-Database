const studentController = require("../controllers/studentController");

module.exports = app => {
    
    // Receives post request from client and calls function from controller
    app.post("/api/names", studentController.findByNames);
    app.post("/api/address", studentController.findByAddresses);
}