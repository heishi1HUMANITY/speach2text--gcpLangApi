'use strict';
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var api_1 = require("./api");
var app = express();
app.use(cors());
app.use('/api/v1', api_1.api);
app.listen(8080, function () { return console.log(':8080'); });
