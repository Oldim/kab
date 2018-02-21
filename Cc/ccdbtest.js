function getRecords(callback) {
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

	connection.query('SELECT * from user', function(err, rows, fields) {
		if (err) {
			console.log('if err');
			callback(err, {});
			
		} else {
			callback(null, rows);
		}
		connection.end();
	});
}

var http = require('http');
http.createServer(function handler(req, res) {
	console.log('request received');
	// Set CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	//res.setHeader('Access-Control-Request-Method', '*');
	//res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.writeHead(200, {
		'Content-Type' : 'application/json'
	});
	getRecords(function(err, rows){
		var result;
		if (err){
			console.log('Error while performing query.');
			console.log(err);
			result = {};
		}
		else{
			console.log("Sending data to client:");
			console.log(JSON.stringify(rows));
			result = rows;
		}
		res.end(JSON.stringify(result));
	});   
}).listen(1337, 'localhost');
console.log('Server running at http://localhost:1337/');

