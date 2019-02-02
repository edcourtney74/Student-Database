const studentController = require("../controllers/studentController");

module.exports = app => {
    
    // Receives get request from client and calls function from controller
    app.get("/api/students", studentController.viewAll);
    
    // Receives post request from client and calls function from controller
    app.post("/api/students", studentController.findStudents);
}