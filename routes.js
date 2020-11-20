var express = require("express");
var router = express.Router();

router.get("/", function(req,res){
  res.render("index");
});

router.get("/reservas", function(req,res){
  res.render("reservas");
});

module.exports = router;