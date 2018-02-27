	var result = {};
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host     : 'ftp.oldim.be',
		user     : 'oldimb1q_kab',
		password : 'JSkab123',
		database : 'oldimb1q_kab',
		port: 2082
		//http://195.238.74.102:2082
	});

	

	connection.connect();

	// connection.query('SELECT * from user', function(err, rows, fields) {
	// 	if (err) {
	// 		console.log(err);
			
	// 	} else {
	// 		console.log(rows);
	// 	}
	// 	connection.end();
	// });
	connection.query({
		sql: 'SELECT * FROM `user` WHERE `username` = ?',
		timeout: 40000, // 40s
		values: ['Oldim']
	  }, function (err, rows, fields) {
		if (err) {
			console.log(err.fatal);
			
		} else {
			console.log(rows);
		}
		connection.end();
	  });
	  