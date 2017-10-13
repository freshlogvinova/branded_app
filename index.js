const express = require('express');
const bodyParser = require('body-parser');
const pg = require("pg");
const path = require('path');
const conString = "pg://postgres:postgres@localhost:5432/brand_db";
const client = new pg.Client(conString);
const fs = require('fs');
const multer = require('multer');
const favicon = require('serve-favicon');

const app = express();

const listener = app.listen(3001, function () {
  console.log("Server is listening on localhost:" + listener.address().port);
});

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  }
});

const upload = multer({storage: storage}).single('file');

client.connect();
//////////////////////////
app.use(bodyParser.json())
    .get('/', function (req, res) {
      res.sendfile(__dirname + '/public/views/index.html');
    })
    // .get('/admin', function(req, res) {
    //   res.sendfile(__dirname + '/public/views/admin.html');
    // })
    .use(express.static(__dirname + '/public'))
    .use(favicon(path.join(__dirname, '/public/assets/images/favicon.ico')))
    .use('/uploads', express.static(__dirname + "/uploads"))
    .get('/get_all_items', function (req, res, next) {
      pg.connect(conString, function (err, successRes, done) {
        if (err) {
          console.log(err)
        } else {
          successRes.on("row", function (data) {
            console.log(data)
          });
          successRes.query('SELECT * FROM items', function (err, result) {
            done();
            if (err) {
              return next(err);
            }
            res.send(result);
          })
        }
      })
    })
    .get('/get_pages', function (req, res, next) {
      pg.connect(conString, function (err, successRes, done) {
        if (err) {
          console.log(err)
        } else {
          successRes.on("row", function (data) {
            console.log(data)
          });
          successRes.query('SELECT * FROM page', function (err, result) {
            done();
            if (err) {
              return next(err);
            }
            res.send(result);
          })
        }
      })
    })
    .post('/download', function (req, res, next) {
      upload(req, res, function (err) {
        if (err) {
          return res.end("Error uploading file.");
        }
        pg.connect(conString, function (err, successRes, done) {
          if (err) {
            console.log(err)
          } else {
            successRes.on("row", function (data) {
              console.log(data)
            });
            successRes.query("INSERT INTO items(link, page) VALUES ($1, $2)", [req.file.path, req.body.select], function (err, result) {
              done();
              if (err) {
                return next(err);
              }
            })
          }
        });
        res.end("File is uploaded");
      });
    });

module.exports = app;