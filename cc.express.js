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


//--------------------------------------------------------
// POST 
//--------------------------------------------------------

app.post('/createUser', function (req, res) {
    let connection = makeConnection();
    let requ= JSON.parse(Object.keys(req.body)[0]);
    //console.log(requ);
   
    connection.query('INSERT INTO user (surname,firstname,username ,password) VALUES ("'+ requ.lastName + '" ,"'+ requ.firstName + '","'+ requ.username + '","'+ requ.password + '")', function (err, rows, fields) {
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



//----------------------------------------------------------
// SERVER LISTEN 
//----------------------------------------------------------

let server = app.listen(1337, '127.0.0.1', function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});