const express = require("express");
const {getAppTitle} = require("../handlers/metadata");
const router = express.Router();

router.get("/title", getAppTitle);

module.exports = router;
