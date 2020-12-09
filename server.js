var express = require("express");

var PORT = process.env.PORT || 8080;

var app = express();

//Serve static content for the app fromt he "public" directory in the application directory
app.use(express.static("public"));