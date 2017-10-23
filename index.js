'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const upload = require('./controller/uploads');
const favicon = require('serve-favicon');
const rimraf = require('rimraf');
const logger = require('morgan');
const url = require('url');
const nunjucks = require('nunjucks');

//Connection to mysql
const connection = require('./controller/db_connect');

//mimetype for upload files
const mimetypeSuccess = ['video/mpeg', 'video/mp4', 'video/ogg', 'video/quicktime', 'video/webm', 'video/x-ms-wmv', 'video/x-flv', 'video/3gpp', 'video/3gpp2'];


//path const
const constPath = ['admin', 'upload', 'get_all_items', 'get_pages', '/remove_video/'];

const app = express();

connection.connect(function (err) {
  if (err) throw err;
});

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
    .use('/uploads', express.static(__dirname + "/uploads"))
    .get('/', function (req, res) {
      try {
        connection.query('SELECT * FROM page ' +
            'LEFT JOIN contents ON contents.page = page.id ' +
            'LEFT JOIN styles ON styles.page = page.id ' +
            'WHERE page.id= ?', [1], function (err, rows, fields) {
          if (err) {
            console.log("ERROR", err);
          }
          else if (!rows.length) {
            res.render('index.html', {error: true});
          }
          else {
            connection.query('SELECT * FROM items WHERE items.page = ?', [1], function (err, items, fields) {
              if (err) {
                console.log("ERROR", err);
              }
              else {
                const list = rows[0].list ? rows[0].list.split('\n') : null;
                res.render('index.html', {data: rows[0], list: list, video: items});
              }
            });
          }
        });
      }
      catch (err) {
        console.log(err)
      }
    })
    .get('/:some', function (req, res) {
      const url = req.path;
      const urlPage = url.replace('/', '');
      try {
        switch (urlPage) {
          case 'get_pages':
            connection.query('SELECT * FROM page', function (err, rows, fields) {
              if (err) {
                console.log("ERROR", err);
              }
              else {
                res.send(rows);
              }
            });
            break;
          case 'get_all_items':
            connection.query('SELECT * FROM items', function (err, rows, fields) {
              if (err) {
                console.log("ERROR", err);
              }
              else {
                res.send(rows);
              }
            });
            break;
          case 'admin':
            connection.query('SELECT * FROM page ' +
                'LEFT JOIN contents ON contents.page = page.id ' +
                'LEFT JOIN styles ON styles.page = page.id ', function (err, rows, fields) {
              if (err) {
                console.log("ERROR", err);
              }
              else if (!rows.length) {
                res.render('index.html', {error: true});
              }
              else {
                connection.query('SELECT * FROM items', function (err, items, fields) {
                  if (err) {
                    console.log("ERROR", err);
                  }
                  else {
                    res.render('admin.html', {data: rows[0], video: items});
                  }
                });
              }
            });
            break;
          default:
            connection.query('SELECT * FROM page ' +
                'LEFT JOIN contents ON contents.page = page.id ' +
                'LEFT JOIN styles ON styles.page = page.id ' +
                'WHERE page.name= ?', [urlPage], function (err, rows, fields) {
              if (err) {
                console.log("ERROR", err);
              }
              else if (!rows.length) {
                res.render('index.html', {error: true});
              }
              else {
                connection.query('SELECT * FROM items WHERE items.page = ?', [rows[0].id], function (err, items, fields) {
                  if (err) {
                    console.log("ERROR", err);
                  }
                  else {
                    const list = rows[0].list ? rows[0].list.split('\n') : null;
                    res.render('index.html', {data: rows[0], list: list, video: items});
                  }
                });
              }
            });
            break;
        }
      }
      catch (err) {
        console.log(err)
      }
    })
    .post('/get_options/:id', function (req, res) {
      try {
        connection.query('SELECT * FROM page ' +
            'LEFT JOIN contents ON contents.page = page.id ' +
            'LEFT JOIN styles ON styles.page = page.id ' +
            'WHERE page.id= ?', [req.params.id], function (err, rows, fields) {
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
    .post('/change/:id', function (req, res) {
      try {
      }
      catch (err) {
        console.log(err)
      }
    })
    .post('/create', upload, function (req, res) {
      try {
        console.log(req.body);
        console.log(req.file);
        // connection.query('INSERT INTO page(name, logo) VALUES (?, ?); ', [req.body.page.name, req.file.path], function (err, rows, fields) {
        //   if (err) console.log(err);
        //   connection.query('SELECT * FROM page WHERE page.name= ?', [req.body.page.name], function (err, idPage, fields) {
        //     if (err) console.log(err);
        //     connection.query('INSERT INTO styles(bck_color, text_color, btn_color, btn_bck_color, page) VALUES (?, ?, ?, ?, ?)',
        //         [req.body.page.styles.bck_color, req.body.page.styles.text_color, req.body.page.styles.btn_color, req.body.page.styles.btn_bck_color, idPage[0].id], function (err, rows, fields) {
        //           if (err) console.log(err);
        //           connection.query('INSERT INTO contents(title, list, link_to, btn_text, page) VALUES (?, ?, ?, ?, ?)',
        //               [req.body.page.content.title, req.body.page.content.list, req.body.page.content.link_to, req.body.page.content.btn_text, idPage[0].id], function (err, rows, fields) {
        //                 if (err) console.log(err);
        //                 res.send("Page was created!")
        //               })
        //         })
        //   })
        // })
      }
      catch (err) {
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
        connection.query('SELECT * FROM items WHERE id_items= ?', [req.params.id], function (err, rows, fields) {
          const path = rows[0].link;
          if (err) {
            console.log("ERROR", err)
          }
          else {
            rimraf('./' + path, function () {
              console.log("file was deleted");
              connection.query('DELETE FROM items WHERE id_items= ?', [req.params.id], function (err, result) {
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

const listener = app.listen(3003, function () {
  console.log("Server is listening on localhost:" + listener.address().port);
});

module.exports = app;