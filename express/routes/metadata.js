var express = require('express');
const { getAppTitle } = require('../handlers/metadata');
var router = express.Router();

router.get('/title', getAppTitle);

module.exports = router;
