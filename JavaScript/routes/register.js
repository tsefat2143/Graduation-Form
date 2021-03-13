let router = require("express").Router();
let bodyParser = require("body-parser");
let database = require('../database');
let flash = require('connect-flash');
let session = require('express-session');
let bcrypt = require('bcrypt');
require("dotenv").config();

//Express Session
router.use(session({
	secret:process.env.RSESSION_SECRET,
	cookie:{maxAge:60000},
	resave: false,
	saveUninitialized:false
}));

router.use(flash());

router.use(bodyParser.urlencoded({extended: false,}));
router.use(bodyParser.json());

router.post("/register", async (req, res) => {
	//information gathered from form by user input
	let first = req.body.first;
	let last = req.body.last;
	let middle = req.body.middle;
	let username = req.body.username;
	let password =  req.body.password;
	let email = req.body.email;
	let gender = req.body.gender;
	let dob = req.body.dob;	

	try {
		const salt = await bcrypt.genSalt();
		const newPassword = await bcrypt.hash(password,salt);

		let sql = `Insert Into graduation.graduates(firstName,lastName,middleName,username,passwords,email,gender,DOB) 
		Values('${first}','${last}','${middle}','${username}','${newPassword}','${email}','${gender}','${dob}');`;
	
		database.query(sql, (error, result) => {
			if (error) {
				console.log('Sql error:' + error);
			}
			else {
				console.log("SQL Record Inserted");
				req.flash('message', 'Success!!');
				res.redirect('/complete');
			}
		});

	} catch (error) {
		console.log('Could not hash password');
	}

});

router.get('/complete',(req, res) => {
	res.render('complete', {message:req.flash('message')});

});

module.exports = router;