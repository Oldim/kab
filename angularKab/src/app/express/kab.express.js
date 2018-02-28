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
    console.log('get request received');

    let connection = makeConnection();

    connection.query('SELECT * FROM user', function (err, rows, fields) {
        let result;
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


//----------------------------------------------------------
// LOGIN USERS OUT DATABASE 
//----------------------------------------------------------

app.post('/authenticate', function (req, res) {
    console.log('post request send');
    let body = {};
    let connection = makeConnection();
    //console.log(req.body);
    let requ = JSON.parse(Object.keys(req.body)[0]);

    // var username = requ.username;
    // var password = requ.password;
    console.log(requ.username);
    connection.query('SELECT * FROM user WHERE username=\'' + requ.username + '\'', function (err, rows, fields) {
        //let requ= req.body;
        // let requ= JSON.parse(Object.keys(req.body)[0]);
        //console.log(requ);
        if (!err) {
            console.log("req.body-----");
            console.log(rows[0]);
            if (rows.length > 0 && requ.username == rows[0].username && requ.password == rows[0].password) {
                console.log("syaski-masyaski");
                // let result = JSON.stringify(rows);
                console.log(requ);
                body = {
                    id: rows[0].ID,
                    username: rows[0].username,
                    firstName: rows[0].firstname,
                    lastName: rows[0].surname,
                    token: 'fake-jwt-token'
                };
                // res.end(result)
                res.send({ status: 200, body: body });
            } else {
                res.send({ message: 'Password is incorrect: ' });
            }

        }
        else {
            //console.log('Password is incorrect: ');
            res.send('Username is incorrect: ');
        }
        // res.end("res.end() POST ok!\n check SQL database if data is added. ");
        connection.end();
    });
});






//--------------------------------------------------------
// POST 
//--------------------------------------------------------

app.post('/createUser', function (req, res) {
    let connection = makeConnection();
    let requ = JSON.parse(Object.keys(req.body)[0]);
    //console.log(requ);

    connection.query('INSERT INTO user (surname,firstname,username ,password) VALUES ("' + requ.lastName + '" ,"' + requ.firstName + '","' + requ.username + '","' + requ.password + '")', function (err, rows, fields) {
        console.log('app.post ( SQL TYPESCRIPT...)');

        // let result;
        // if (!err) {
        //     let result = JSON.stringify(rows);
        //     console.log(result);

        //     res.end(result)
        // }
        // else {
        //     console.log('Error while performing query.');
        // }
        res.end("res.end() POST ok!\n check SQL database if data is added. ");
        connection.end();
    });
});


//--------------------------------------------------------
// POST + NEW CATEGORY
//--------------------------------------------------------

app.post('/createCategory', function (req, res) {
    let body = {};
    console.log("Express server /createCategory... ");
    let connection = makeConnection();
    let requ = JSON.parse(Object.keys(req.body)[0]);
    //console.log(requ);

    connection.query('INSERT INTO category (description, ID) VALUES ("' + requ.cat_description + '","' + requ.ID + '")', function (err, rows, fields) {
        console.log('app.post ( SQL TYPESCRIPT category...)');
        body = {
            cat_id: rows.insertId
        };
        // mariaDB LASTINDEXOF om cat_id terug te krijgen voor Delete
        console.log(requ);
        // res.send({ message: rows.insertId });
        res.send({  body: body });
        connection.end();
    });
});


//--------------------------------------------------------
// DELETE CATEGORY
//--------------------------------------------------------

app.delete('/deleteCategory/:id', function (req, res) {
    console.log("Express server /deleteCategory ");
    console.log(res)
    let connection = makeConnection();
    connection.query('DELETE FROM category WHERE cat_id LIKE \'' + req.params.id + '\''),
        function (err, rows, fields) {
            console.log('app.delete ( SQL TYPESCRIPT category...)');
            console.log(res.insertId);
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