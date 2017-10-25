const express = require('express');
const multiparty = require('multiparty');
const connection = require('./db_connect');
const upload = require('./uploads');
const url = require('url');
const router = express.Router();

connection.connect(function (err) {
  if (err) throw err;
});

//mimetype for upload video
const mimetypeSuccess = ['video/mpeg', 'video/mp4', 'video/ogg', 'video/quicktime', 'video/webm', 'video/x-ms-wmv', 'video/x-flv', 'video/3gpp', 'video/3gpp2'];

//mimetype for upload image
const mimetypeImageSuccess = ['image/jpeg', 'image/pjpeg', 'image/gif', 'image/bmp', 'image/x-icon', 'image/png', 'image/x-quicktime', 'image/tiff'];

/* GET the different pages */
router.get('/*', function (req, res) {
  const url = req.path;
  const urlPage = url === '/' ? url : url.replace('/', '');
  try {
    switch (urlPage) {
      case '/':
        connection.query('SELECT * FROM page LIMIT 1 ', function (err, page, fields) {
          connection.query('SELECT * FROM page ' +
              'LEFT JOIN contents ON contents.page = page.id ' +
              'LEFT JOIN styles ON styles.page = page.id ' +
              'WHERE page.id= ?', [page[0].id], function (err, rows, fields) {
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
        });
        break;
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
});

/* POST options for change admin page */
router.post('/get_options/:id', function (req, res) {
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
});

/* POST create to create a new page */
router.post('/create', function (req, res) {
  try {
    connection.query('INSERT INTO page(name, logo) VALUES (?, ?); ', [req.body.name, '/uploads/' + req.body.logo], function (err, rows, fields) {
      if (err) console.log(err);
      connection.query('SELECT * FROM page WHERE page.name= ?', [req.body.name], function (err, idPage, fields) {
        if (err) console.log(err);
        connection.query('INSERT INTO styles(bck_color, text_color, btn_color, btn_bck_color, page) VALUES (?, ?, ?, ?, ?)',
            [req.body.styles.bck_color, req.body.styles.text_color, req.body.styles.btn_color, req.body.styles.btn_bck_color, idPage[0].id], function (err, rows, fields) {
              if (err) console.log(err);
              connection.query('INSERT INTO contents(title, list, link_to, btn_text, page) VALUES (?, ?, ?, ?, ?)',
                  [req.body.content.title, req.body.content.list, req.body.content.link_to, req.body.content.btn_text, idPage[0].id], function (err, rows, fields) {
                    if (err) console.log(err);
                    res.send("Page was created!")
                  })
            })
      })
    })
  }
  catch (err) {
    console.log(err)
  }
});

/* POST create to update the page */
router.post('/update', function (req, res) {
  try {
    connection.query('UPDATE page SET name = ?, logo = ? WHERE id = ?;', [req.body.name, '/uploads/'+req.body.logo, req.body.id], function (err, rows, fields) {
      if (err) console.log(err);
      connection.query('UPDATE styles SET bck_color = ? , text_color = ?, btn_color = ?, btn_bck_color = ? WHERE page = ?;',
          [req.body.bck_color, req.body.text_color, req.body.btn_color, req.body.btn_bck_color, req.body.id], function (err, rows, fields) {
            if (err) console.log(err);
            connection.query('UPDATE contents SET title = ?, list = ?, link_to = ?, btn_text = ? WHERE page = ?;',
                [req.body.title, req.body.list, req.body.link_to, req.body.btn_text, req.body.id], function (err, rows, fields) {
                  if (err) console.log(err);
                  res.send("Page was updated!")
                })
          })
    })
  }
  catch (err) {
    console.log(err)
  }
});

/* POST upload the video */
router.post('/upload-video', upload, function (req, res) {
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
});

/* POST upload the image */
router.post('/upload-image', upload, function (req, res) {
  try {
    if (!!req.file.mimetype && (!!~mimetypeImageSuccess.indexOf(req.file.mimetype)) && !!req.body.select) {
      res.send("file save on server");
    }
    else res.send("file save didn't save");
  } catch (err) {
    console.log(err)
  }
});

/* DELETE for delete the vide o*/
router.delete('/remove_video/:id', function (req, res) {
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

/* DELETE for delete the page */
router.delete('/remove_page/:id', function (req, res) {
  try {
    connection.query('DELETE FROM items WHERE page= ?', [req.params.id], function (err, result) {
      if (err) {
        console.log("ERROR", err)
      }
      connection.query('DELETE FROM contents WHERE page= ?', [req.params.id], function (err, result) {
        if (err) {
          console.log("ERROR", err)
        }
        connection.query('DELETE FROM styles WHERE page= ?', [req.params.id], function (err, result) {
          if (err) {
            console.log("ERROR", err)
          }
          connection.query('DELETE FROM page WHERE id= ?', [req.params.id], function (err, result) {
            if (err) {
              console.log("ERROR", err)
            }
            res.send("Page was deleted");
          });
        });
      });
    });
  }
  catch (err) {
    console.log(err)
  }
});


module.exports = router;
