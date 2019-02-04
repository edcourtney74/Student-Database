const studentController = require("../controllers/studentController");

module.exports = app => {
    
    // Receives post request from client and calls function from controller
    app.post("/api/students", studentController.findStudents);
}