let mysql = require("mysql");
let express = require("express");
let bodyParser = require("body-parser");
let path = require("path");
let bcrypt = require("bcrypt");

require("dotenv").config();
/*
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
	else console.log(`Mysql created`);
});
*/

let app = express();

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use(bodyParser.json());

app.use("/Styling", express.static("Styling"));

app.get("/index.html", (req, res) => {
	res.sendFile(path.join(__dirname, "../HTML/index.html"));
});

app.get("/contact.html", (req, res) => {
	res.sendFile(path.join(__dirname, "../HTML/contact.html"));
});

app.get("/register.html", (req, res) => {
	res.sendFile(path.join(__dirname, "../HTML/register.html")); //'../HTML/register.html'
});

app.post("/register.html", (req, res) => {
	let first = req.body.first;
	let last = req.body.last;
	let middle = req.body.middle;
	let username = req.body.username;
	let password = bcrypt.hash(req.body.password);
	let email = req.body.email;
	let gender = req.body.gender;
	let dob = req.body.dob;

	console.log(first);
	res.send(last);
	res.send(middle);
	res.send(username);
	res.send(password);
	res.send(email);
	res.send(gender);
	res.send(first);
	res.send(dob);
	// let sql = `Insert Into graduation.graduates(firstName,lastName,middleName,username,passwords,email,gender,DOB)Values(${first},${last},${middle},${username},${password},${email},${gender},str_to_date('${dob}','%m-%d-%Y'))`;
	// database.query(sql, (error, result) => {
	// 	if (error) console.log("SQL error");
	// 	else console.log("SQL Record Inserted");
	// });
});

app.listen(3000, () => {
	console.log(`Server started on port 3000`);
});
