function getRecords(callback) {
	var result = {};
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host     : '81.241.232.193',
    user     : 'oldimb1q_kab',
    password : 'JSkab123',
		database : 'oldimb1q_kab',
		port: 3306
	});

	connection.connect();

	connection.query('SELECT * from user', function(err, rows, fields) {
		if (err) {
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

