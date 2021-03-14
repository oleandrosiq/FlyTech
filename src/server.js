"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var express_1 = require("express");
var ejs_1 = require("ejs");
var path_1 = require("path");
app_1.app.use(express_1["default"].static(path_1["default"].join('public')));
app_1.app.set('views', path_1["default"].join('public'));
app_1.app.engine('html', ejs_1["default"].renderFile);
app_1.app.set('view engine', 'html');
app_1.app.listen(3000, function () {
    console.log("Server is running!");
});
