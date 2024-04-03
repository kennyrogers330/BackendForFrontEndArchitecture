const express = require("express");

const dotenv = require("dotenv");

const app = express();

const validateClientType = require("./middlewares/validateClient");

const verifyJwt = require("./middlewares/verifyJwt");

dotenv.config();

app.use(express.json());

app.use(verifyJwt);

app.use(validateClientType);

module.exports = app;
