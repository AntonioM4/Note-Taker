// Dependencies
var express = require("express");

// I'm creating an 'express' server called app
var app = express();

// Sets a port or run at 
var PORT = process.env.PORT || 3001;

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