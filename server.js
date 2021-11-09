// Dependencies
const express = require("express");

// I'm creating an 'express' server called app
const app = express();

// Sets a port or run at 3001
const PORT = process.env.PORT || 3001;

//Use a middleware to parse the JSON data
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

// Bring routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//Listener
app.listen(PORT, function() {
    console.log("App listening on http://localhost:${PORT}");
});