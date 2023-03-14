var express = require('express');
var home = require('./home');
var metadata = require('./metadata');

var router = express.Router();
router.use('/', home);
router.use('/meta', metadata);

module.exports = router;
