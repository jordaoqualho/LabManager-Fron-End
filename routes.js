var express = require("express");
var router = express.Router();

router.get("/", function(req,res){
  console.log("Hello i'm the start page here");
  res.render("index");
});

module.exports = router;