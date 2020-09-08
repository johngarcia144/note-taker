
const express = require('express');
const path = require('path');
const fs = require("fs");
const crypto = require("crypto");
const util = require("util") // DO I NEED 

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 9080;

// Sets up the Express app to handle data parsing and to read static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

require("./routing/api-routes")(app);
require("./routing/html-routes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});