let router = require("express").Router();
let bodyParser = require("body-parser");
let database = require('../database');
let flash = require('connect-flash');
let session = require('express-session');
let bcrypt = require('bcrypt');
require("dotenv").config();
//let check = require('../validation')

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

router.post("/register",  (req, res) => {
	let storeAccount = async (first, last, middle, username, password, email, gender, dob) => {
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

	//information gathered from form by user input
	let {first, last, middle, username, password, password2, email, gender, dob} = req.body;
	let errors = [];

	if(!first || !last || !username || !password || !password2 || !email || !gender || !dob){
		errors.push('Please Enter All Fields')
		res.render('register',{error:errors})
	}

	if(password && password.length < 8){
		errors.push('Passwords Must Be At Least 8 Characters Long')
	}

	if(password != password2){
		errors.push('Passwords Do Not Match')
	}

	if(email){
		let checkEmail = `select graduationID from graduation.graduates where email='${email}' or username ='${username}'`;
		return database.query(checkEmail, (error, result) => {
			if (error) {
				console.log('Sql error:' + error);
			}			
			if(result.length > 0){
				errors.unshift('Email/Username already exists')
				res.render('register',{error:errors})
				console.log(errors);
				return
			}
			else if (result.length == 0 && errors.length > 0){
				res.render('register',{error:errors})
			}
			else{
				storeAccount(first, last, middle, username, password, email, gender, dob)
			}
		})
	}
});

router.get('/login',(req, res) => {
	res.render('login', {message:req.flash('message')},error='');
});

module.exports = router;