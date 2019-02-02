const express = require("express");
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const db = require("./models");
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

// Static directory
app.use(express.static("public"));

// Get routes
require("./routes/htmlRoutes.js")(app);

var syncOptions = { force: false };

// Start the server and sync models 
db.sequelize.sync(syncOptions).then(function() {
    app.listen(PORT, function() {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    });
  });