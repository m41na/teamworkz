const express = require("express");
const home = require("./home");
const metadata = require("./metadata");

const router = express.Router();
router.use("/", home);
router.use("/meta", metadata);

module.exports = router;
