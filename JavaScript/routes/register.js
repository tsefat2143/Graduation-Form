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

router.get('/register', (req, res) => {
	res.render('register', {error:''})
})

router.post("/register", async (req, res) => {
	//information gathered from form by user input
	let {first, last, middle, username, password, password2, email, gender, dob} = req.body;
	let errors = [];

	if(password != password2){
		errors.push('Passwords Do Not Match')
	}
	if(!middle){
		errors.push('mid')
	}

	let checkEmail = 'Select email from graduation.graduates';
	
	if(errors.length > 0){
		res.render('register', {error: errors})
	}		

	else{
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
				res.redirect('/login');
			}
		});

	} catch (error) {
		console.log('Could not hash password');
	}
	}
});

router.get('/login',(req, res) => {
	res.render('login', {message:req.flash('message')});
});

module.exports = router;