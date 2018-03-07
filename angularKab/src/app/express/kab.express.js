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
        port: 3306,
        multipleStatements: true
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

//******************************************************************************************/
//   USER & LOGIN
//******************************************************************************************/

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
        } else {
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
        console.log(requ);
        
        if (err) {
            res.send("username is already taken")
        } else {
            res.send({ status: 200 })
        }
        
        connection.end();
    });
});

//******************************************************************************************/
//   CATEGORIES
//******************************************************************************************/

//----------------------------------------------------------
// GET CATEGORIES OUT OF DATABASE & SUBCATs
//----------------------------------------------------------
app.get('/getAllCat/:id', function (req, res) {
    console.log('express:get all categories');
    let requ = req.params.id;
    let connection = makeConnection();

    //connection.query('SELECT * FROM category WHERE id = "' + requ + '"', function (err, rows, fields) {
    connection.query('SELECT C.*, S.cat_id AS scat_id FROM category C LEFT JOIN subcat S ON C.cat_id = S.subcat_id WHERE id = "' + requ + '"', function (err, rows, fields) {
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
    console.log("reqybody", req.body);
    let requ = JSON.parse(Object.keys(req.body)[0]);
    console.log("reqy", requ);
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
// UPDATE CATEGORY
//--------------------------------------------------------

app.post('/editCategory', function (req, res) {
    let body = {};
    console.log("Express server /editCategory... ");
    let connection = makeConnection();
    let requ = JSON.parse(Object.keys(req.body)[0]);
    console.log('req.body', req.body);
    console.log('requ', requ);
    connection.query('UPDATE category SET description = "' + requ.cat_description + '" WHERE cat_id = ' + requ.cat_id, function (err, rows, fields) {
        if (!err) {
            //----------------------------------
            // GET ANSWER BACK FOR ID 
            //----------------------------------
            res.send({ body: body });
            connection.end();
        } else {
            console.log(err.message);
            res.send({ body: err.message });
        }
    });
});


//--------------------------------------------------------
// DELETE CATEGORY + SUB-CAT
//--------------------------------------------------------

// First delete subCategories before deletion of Category 

app.delete('/deleteCategory/:id', function (req, res) {
    let connection = makeConnection();
    var delGeg = [req.params.id];
    connection.query("SELECT subcat_id FROM subcat WHERE cat_id = ?", [req.params.id],
        function (err1, rows1, fields1) {
            var sql = "";
            if (rows1.length > 0) {
                let baby_ids = [];
                for (let i = 0; i < rows1.length; i++) {
                    baby_ids.push(rows1[i].subcat_id);
                }
                console.dir(baby_ids);
                let baby_ids_string = "(" + baby_ids.join() + ")";
                console.dir(baby_ids_string);
                sql = "DELETE FROM subcat WHERE subcat_id IN " + baby_ids_string + ";";
                sql += "DELETE FROM category WHERE cat_id IN " + baby_ids_string + ";";
            }
            sql += "DELETE FROM category WHERE cat_id = ?;";
            connection.query(sql, delGeg,
                //connection.query('DELETE FROM category WHERE cat_id = ' + req.params.id ),
                function (err, rows, fields) {
                    res.send({ message: "res.send() delete ok --> Check database !" });
                    connection.end();
                });
        })
});



//******************************************************************************************/
//   SUB-CATEGORY
//******************************************************************************************/

//--------------------------------------------------------
// POST + NEW Sub-CATEGORY
//--------------------------------------------------------
app.post('/createSubCategory', function (req, res) {
    let body = {};
    let connection = makeConnection();
    let requ = JSON.parse(Object.keys(req.body)[0]);
    console.log("tstess -----");
    console.log(requ);
    //var catRec= {description: 'requ.cat_description', ID: 'requ.ID'};
    //var subCatRec ={subcat_id: requ.cat_id, cat_id: requ.cat_id};
    var subCatRec = [requ.cat_description, requ.ID, requ.subcat_id];
    var sql = "INSERT INTO category (description, ID) VALUES (?,?);";
    sql += "INSERT INTO subcat (subcat_id, cat_id) VALUES (last_insert_id(),?)";
    connection.query(sql, subCatRec, function (err, rows, fields) {
        if (!err) {
            console.log('app.post ( SQL TYPESCRIPT category...)');
            console.log("rows.insertid: ", rows.insertId);

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

//******************************************************************************************/
//   TASKS 
//******************************************************************************************/

//--------------------------------------------------------
// POST + NEW TAAK
//--------------------------------------------------------
app.post('/createTask', function (req, res) {
    let body = {};
    let connection = makeConnection();
    let requ = JSON.parse(Object.keys(req.body)[0]);
    console.log("app.post(/createTask)");
    //  console.log("requ.params.cat_id: ",requ.params.cat_id);
    console.log("requ.cat_id: ", requ.cat_id);

    var taskRec = [requ.cat_id];
    var sql = "INSERT INTO task (title,details, cat_id) VALUES ('" + requ.title + "','" + requ.details + "','?');";

    // sql += "INSERT INTO subcat (subcat_id, cat_id) VALUES (last_insert_id(),?)";
    connection.query(sql, taskRec, function (err, rows, fields) {
        if (!err) {
            console.log('app.post ( SQL TYPESCRIPT task...)');
            console.log('res.send() rows.insertID: ', rows.insertId);
            body = {
                task_id: rows.insertId
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
// DELETE TASK
//--------------------------------------------------------

app.delete('/deleteTask/:id', function (req, res) {
    console.log('app.deleteTask () Kab.express');
    
    let connection = makeConnection();
    var delGeg = [req.params.id];
    console.log("req.params.id: ", req.params.id);

    var sql = "DELETE FROM task WHERE task_id = ?;";
    connection.query(sql, delGeg, function (err, rows, fields) {
        if (!err) {
            console.log('app.delete SQL TYPESCRIPT task...)');
            res.send({ message: "res.send() delete task ok --> Check database !" });
        }
        else {
            console.log(err.message);
            res.send({ body: err.message });
        }
        connection.end();
    });
});





//******************************************************************************************/
//   SERVER
//******************************************************************************************/
//----------------------------------------------------------
// SERVER LISTEN 
//----------------------------------------------------------

let server = app.listen(1337, '127.0.0.1', function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});