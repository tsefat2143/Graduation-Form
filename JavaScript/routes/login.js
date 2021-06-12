let router = require("express").Router();
let bodyParser = require("body-parser");
let database = require('../database');
let session = require('express-session');
let bcrypt = require('bcrypt')
require("dotenv").config();

let user = ''

router.use(session({
    secret:process.env.LSESSION_SECRET,
	cookie:{maxAge:10*60*1000}, //10 minutes
	resave: false,
	saveUninitialized:false
}))

router.use(bodyParser.urlencoded({extended: false,}));
router.use(bodyParser.json());

router.post("/login", (req, res) => {
	let username = req.body.username;
    let password = req.body.password;

    let sql = `Select firstName, lastName, username, passwords From graduation.graduates Where username = '${username}';`;

     database.query(sql,async(error,result) =>{
        if(error) throw error;

        if(result.length !==0){
        try {
            if(await bcrypt.compare(password,result[0]['passwords'])){               
                user = result[0]['firstName'] + " " + result[0]['lastName'];
                req.session.op= 1;

                res.redirect('home')

            }
            else{
                res.send("Login Failed")
            }
         // shows hashed password console.log(result[0]['passwords']);
        } catch (error) {
            
        }
    }
    else{
        res.send('User does not exist');
    }
    }) 
})

router.get("/home", (req, res) => {
    res.render('home',{name:user,status:false})
})

module.exports = router;