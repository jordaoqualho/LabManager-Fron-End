// Imports
var path = require("path");
var express = require("express");
var app = express();
var routes = require("./routes");

// Static files
app.set("port", process.env.PORT || 3000);
app.use(routes);
app.use(express.static('public'));
app.use('css', express.static(__dirname + '/public/css'));
app.use('views', express.static(__dirname + '/public/views'));

app.set('views', './public/views');
app.set("view engine","ejs");

app.use(routes);

app.listen(app.get("port"), function(){
  console.log("Server status on port " + app.get("port"));
});