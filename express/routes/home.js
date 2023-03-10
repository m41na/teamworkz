var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  const page = fs.readFileSync('build/index.html', { encoding: 'utf8', flag: 'r' });
  res.send(page)
});

module.exports = router;
