const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({path: path.resolve(process.cwd(), "functions/express/.env")});
// var session  = require('express-session');
const flash = require("connect-flash");

const routes = require("./express/routes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));
app.use(cors());
// app.use(session({
//     secret: process.env.SESSION_TOKEN,
//     resave: false,
//     saveUninitialized: false,
//     unset: 'destroy'
// }));
app.use(flash());
app.use("/api", routes);

module.exports = app;
