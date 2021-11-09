// Dependencies
var express = require("express");

// I'm creating an 'express' server called app
var app = express();

// Sets a port or run at 7000, Later listener will listen this
var PORT = process.env.PORT || 7000;

//Use a middleware to parse the JSON data
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

// Bring routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});