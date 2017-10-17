const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const favicon = require('serve-favicon');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: 'brand_db'
});
const app = express();

const listener = app.listen(3001, function () {
    console.log("Server is listening on localhost:" + listener.address().port);
});

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '_' + file.originalname);
    }
});
const upload = multer({storage: storage}).single('file');

connection.connect();
app.use(bodyParser.json())
    .get('/', function (req, res) {
        res.sendfile(__dirname + '/public/views/index.html');
    })
    .use(express.static(__dirname + '/public'))
    .use(favicon(path.join(__dirname, '/public/assets/images/favicon.ico')))
    .use('/uploads', express.static(__dirname + "/uploads"))
    .get('/get_all_items', function (req, res) {
        connection.query('SELECT * FROM items', function (err, rows, fields) {
            if (!err) {
                res.send(rows);
            }
            else
                console.log('Error guery items.');
        });
    })
    .get('/get_pages', function (req, res) {
        connection.query('SELECT * FROM page', function (err, rows, fields) {
            if (!err) {
                res.send(rows);
            }
            else
                console.log('Error guery page.');
        });
    })
    .post('/upload', upload, function (req, res) {
        const mimetypeSuccess = ['video/mpeg', 'video/mp4', 'video/ogg', 'video/quicktime', 'video/webm', 'video/x-ms-wmv', 'video/x-flv', 'video/3gpp', 'video/3gpp2'];

        if (!!req.file.mimetype && (!!~mimetypeSuccess.indexOf(req.file.mimetype)) && !!req.body.select) {
            connection.query('INSERT INTO items(link, page) VALUES (?, ?)', [req.file.path, req.body.select], function (err, rows, fields) {
                if (err) {
                    console.log('Error guery.');
                    res.send("file didn't save on server");
                }
                else {
                    console.log('Success');
                    res.send("file saved on server");
                }
            });
        }
        else {
            console.log("error");
            res.send("file didn't save on server");
        }
    });

module.exports = app;