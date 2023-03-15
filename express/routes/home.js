const express = require("express");
const router = express.Router();
const fs = require("fs");

/* GET home page. */
router.get("/", (req, res, next) => {
  // If using a template engine, use 'render'
  // res.render('index', { title: 'Express' });
  // If not using a template engine, read the file yourself and send the content
  const page = fs.readFileSync("build/index.html", {encoding: "utf8", flag: "r"});
  res.send(page);
});

module.exports = router;
