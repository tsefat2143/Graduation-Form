let router = require("express").Router();
let bodyParser = require("body-parser");
let path = require('path');
let database = require('../database');

router.use(bodyParser.urlencoded({extended: false,}));
router.use(bodyParser.json());


router.post("/register", (req, res) => {
	//information gathered from form by user input
	let first = req.body.first;
	let last = req.body.last;
	let middle = req.body.middle;
	let username = req.body.username;
	let password = req.body.password;
	let email = req.body.email;
	let gender = req.body.gender;
	let dob = req.body.dob;	
	
	let sql = `Insert Into graduation.graduates(firstName,lastName,middleName,username,passwords,email,gender,DOB) Values('${first}','${last}','${middle}','${username}','${password}','${email}','${gender}','${dob}');`;

	database.query(sql, (error, result) => {
		if (error) console.log(error);
		else {
			console.log("SQL Record Inserted");
			res.sendFile(path.join(__dirname, "../../HTML/login.html"));
		};
	});
});

module.exports = router;