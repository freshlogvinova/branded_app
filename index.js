const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const upload = require('./controller/uploads');
const favicon = require('serve-favicon');
const rimraf = require('rimraf');
const logger = require('morgan');

//Connection to mysql
const connection = require('./controller/db_connect');

//mimetype for upload files
const mimetypeSuccess = ['video/mpeg', 'video/mp4', 'video/ogg', 'video/quicktime', 'video/webm', 'video/x-ms-wmv', 'video/x-flv', 'video/3gpp', 'video/3gpp2'];

const app = express();

connection.connect(function (err) {
  if (err) throw err;
});

app.use(bodyParser.json())
    .get('/', function (req, res) {
      res.sendfile(__dirname + '/public/views/index.html');
    })
    .use(express.static(__dirname + '/public'))
    .use(favicon(path.join(__dirname, '/public/assets/images/favicon.ico')))
    .use(logger('dev'))
    .use('/uploads', express.static(__dirname + "/uploads"))
    .get('/get_all_items', function (req, res) {
      try {
        connection.query('SELECT * FROM items', function (err, rows, fields) {
          if (err) {
            console.log("ERROR", err);
          }
          else {
            res.send(rows);
          }
        });
      }
      catch (err) {
        console.log(err)
      }
    })
    .get('/get_pages', function (req, res) {
      try {
        connection.query('SELECT * FROM page', function (err, rows, fields) {
          if (err) {
            console.log("ERROR", err);
          }
          else
            res.send(rows);
        });
      } catch (err) {
        console.log(err)
      }

    })
    .post('/upload', upload, function (req, res) {
      try {
        if (!!req.file.mimetype && (!!~mimetypeSuccess.indexOf(req.file.mimetype)) && !!req.body.select) {
          connection.query('INSERT INTO items(link, page) VALUES (?, ?)', [req.file.path, req.body.select], function (err, rows, fields) {
            if (err) {
              console.log("ERROR", err);
              res.send("file didn't save on server");
            }
            else {
              res.send("file saved on server");
            }
          });
        }
        else {
          res.send("file didn't save on server");
        }
      } catch (err) {
        console.log(err)
      }

    })
    .delete('/remove_video/:id', function (req, res) {
      try {
        connection.query('SELECT * FROM items WHERE id= ?', [req.params.id], function (err, rows, fields) {
          const path = rows[0].link;
          if (err) {
            console.log("ERROR", err)
          }
          else {
            rimraf('./' + path, function () {
              console.log("file was deleted");
              connection.query('DELETE FROM items WHERE id= ?', [req.params.id], function (err, result) {
                if (err) {
                  console.log("ERROR", err)
                }
              });
            });
          }
        });
      }
      catch (err) {
        console.log(err)
      }
    });

const listener = app.listen(3001, function () {
  console.log("Server is listening on localhost:" + listener.address().port);
});

module.exports = app;