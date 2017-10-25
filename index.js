'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const favicon = require('serve-favicon');
const rimraf = require('rimraf');
const logger = require('morgan');
const url = require('url');
const nunjucks = require('nunjucks');
const routes = require('./controller/routes');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
});

// Setup views folder
app.set("views", __dirname + "/views");

// Parse form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json())
    .use(express.static(__dirname + '/assets'))
    .use(favicon(path.join(__dirname, '/assets/images/favicon.ico')))
    .use(logger('dev'))
    .use('/uploads', express.static(__dirname + "/uploads"));

app.use('/', routes);

const listener = app.listen(3001, function () {
  console.log("Server is listening on localhost:" + listener.address().port);
});

module.exports = app;