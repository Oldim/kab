'use strict';

let express = require('express');
let app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

//----------------------------------------------------------
// CREATE CONNECTION 
//----------------------------------------------------------
let makeConnection = function () {
    var result = {};
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost', //	host     : '81.241.232.193',
        user: 'root',  //		user     : 'oldimb1q_kab',
        password: 'root', //    password : 'JSkab123',
        database: 'kab', //     database : 'oldimb1q_kab'
        port: 3306
    });
    connection.connect();
    return connection;
}

//----------------------------------------------------------
// CORS 
//----------------------------------------------------------

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//----------------------------------------------------------
// GET USERS OUT DATABASE 
//----------------------------------------------------------

app.get('/user', function (req, res) {
    let connection = makeConnection();
    connection.query('SELECT * FROM user', function (err, rows, fields) {
        let result;
        if (!err) {
            let result = JSON.stringify(rows);
            res.end(result)
        }else {
            console.log('Error while performing query.');
        }
        connection.end();
    });
});


//----------------------------------------------------------
// LOGIN USERS OUT DATABASE 
//----------------------------------------------------------

app.post('/authenticate', function (req, res) {
    let body = {};
    let connection = makeConnection();
    let requ = JSON.parse(Object.keys(req.body)[0]);
    connection.query('SELECT * FROM user WHERE username=\'' + requ.username + '\'', function (err, rows, fields) {
        if (!err) {
            console.log("req.body-----");
            console.log(rows[0]);
            if (rows.length > 0 && requ.username == rows[0].username && requ.wachtwoord == rows[0].wachtwoord) {
                body = {
                    id: rows[0].id,
                    username: rows[0].username,
                    firstName: rows[0].firstname,
                    lastName: rows[0].surname,
                    token: 'fake-jwt-token'
                };
                res.send({ status: 200, body: body });
            } else {
                res.send({ message: 'Password is incorrect: ' });
            }
        } else {
            res.send({ message: 'Password or Username is incorrect: ' });
        }
         //res.end("res.end() POST ok!\n check SQL database if data is added. ");
        connection.end();
    });
});



//--------------------------------------------------------
// REGISTER: CREATE NEW USER 
//--------------------------------------------------------

app.post('/createUser', function (req, res) {
    let connection = makeConnection();
    let requ = JSON.parse(Object.keys(req.body)[0]);
    connection.query('INSERT INTO user (surname,firstname,username ,wachtwoord) VALUES ("' + requ.lastName + '" ,"' + requ.firstName + '","' + requ.username + '","' + requ.wachtwoord + '")', function (err, rows, fields) {
        res.end("res.end() POST ok!\n check SQL database if data is added. ");
        connection.end();
    });
});

//----------------------------------------------------------
// GET CATEGORIES OUT OF DATABASE
//----------------------------------------------------------
app.get('/getAllCat/:id', function (req, res) {
    console.log('express:get all categories');
    let requ = req.params.id;
    let connection = makeConnection();
    connection.query('SELECT * FROM category WHERE id = "' + requ + '"', function (err, rows, fields) {
        if (!err) {
            let result = JSON.stringify(rows);
            console.log(result);

            res.end(result)
        }
        else {
            console.log('Error while performing query.');
        }
        connection.end();
    });
});

//--------------------------------------------------------
// CREATE NEW CATEGORY
//--------------------------------------------------------

app.post('/createCategory', function (req, res) {
    let body = {};
    let connection = makeConnection();
    let requ = JSON.parse(Object.keys(req.body)[0]);
    connection.query('INSERT INTO category (description, ID) VALUES ("' + requ.cat_description + '","' + requ.ID + '")', function (err, rows, fields) {
        if (!err) {
            console.log('app.post ( SQL TYPESCRIPT category...)');
            body = {
                cat_id: rows.insertId
            };
            //----------------------------------
            // GET ANSWER BACK FOR ID 
            //----------------------------------
            res.send({ body: body });
        }
        else {
            console.log(err.message);
            res.send({ body: err.message });
        }
        connection.end();
    });
});


//--------------------------------------------------------
// POST + NEW Sub-CATEGORY
//--------------------------------------------------------

app.post('/createSubCategory', function (req, res) {
    let body = {};
    let connection = makeConnection();
    let requ = JSON.parse(Object.keys(req.body)[0]);
    console.log(requ);
    connection.query('INSERT INTO subcat (subCat_description, cat_id) VALUES ("' + requ.subCat_description + '","' + requ.cat_id + '")', function (err, rows, fields) {
        if (!err) {
            console.log('app.post ( SQL TYPESCRIPT category...)');
            console.log(rows.insertId);
            
            body = {
                subcat_id: rows.insertId
            };
            //----------------------------------
            // GET ANSWER BACK FOR ID 
            //----------------------------------
            //res.send({ message:"sub added" });
             res.send({ body: body });
        }
        else {
            console.log(err.message);
            res.send({ body: err.message });
        }
        connection.end();
    });
});


//--------------------------------------------------------
// UPDATE CATEGORY
//--------------------------------------------------------

app.post('/editCategory', function (req, res) {
    let body = {};
    console.log("Express server /editCategory... ");
    let connection = makeConnection();
    let requ = JSON.parse(Object.keys(req.body)[0]);
    connection.query('UPDATE category SET description = "' + requ.cat_description + '" WHERE cat_id = ' + requ.cat_id , function (err, rows, fields) {
        if (!err) {
            //----------------------------------
            // GET ANSWER BACK FOR ID 
            //----------------------------------
            res.send({ body: body });
            connection.end();
        }else {
            console.log(err.message);
            res.send({ body: err.message });
        }
    });
});

//--------------------------------------------------------
// DELETE CATEGORY
//--------------------------------------------------------

app.delete('/deleteCategory/:id', function (req, res) {
    let connection = makeConnection();
    connection.query('DELETE FROM category WHERE cat_id LIKE \'' + req.params.id + '\''),
        function (err, rows, fields) {
            res.send({ message: "res.send() delete ok --> Check database !" });
            connection.end();
        };
});


//----------------------------------------------------------
// SERVER LISTEN 
//----------------------------------------------------------

let server = app.listen(1337, '127.0.0.1', function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});