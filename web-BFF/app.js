const express = require("express");

const dotenv = require("dotenv");

const app = express();

const BFF = require("./utils/router");

const verifyJwt = require("./middlewares/verifyJwt");

dotenv.config();

app.use(express.json());

app.use(verifyJwt);

app.use(BFF.routeRequests);

module.exports = app;
