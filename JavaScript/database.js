let mysql = require("mysql");
require("dotenv").config();

let database = mysql.createConnection({
	//connection to DB
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	port: process.env.MYSQL_PORT,
});

database.connect((error) => {
	if (error) console.log(`The error is ${error}`);
	else console.log(`Mysql-Graduation created`);
});

module.exports = database;