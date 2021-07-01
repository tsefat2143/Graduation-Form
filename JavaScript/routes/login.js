let router = require("express").Router();
let bodyParser = require("body-parser");
let database = require('../database');
let session = require('express-session');
let bcrypt = require('bcrypt')
require("dotenv").config();

let fullName = '';
let globalUsername = '';
let globalStatus = ''

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

    if(!username || !password){
        res.render('login', {error:'Enter Username and Password'},message='')    
    }

    let sql = `Select firstName, lastName, username, passwords, gradStatus From graduation.graduates Where username = '${username}';`;

     database.query(sql,async(error,result) =>{
        if(error) throw error;

        if(result.length !==0){
        try {
            if(await bcrypt.compare(password,result[0]['passwords'])){               
                fullName = result[0]['firstName'] + " " + result[0]['lastName'];
                globalUsername = result[0]['username'];
                globalStatus = result[0]['gradStatus'];
                res.redirect('home')
            }
            else{
                res.render('login', {error:'Incorrect Password'},message='')            
            }
        } catch (error) {
            console.log(error);   
        }
    }
    else{
        res.render('login', {error:'User Does Not Exist'},message='')    
    }}) 
})

router.get("/home", (req, res) => {
    let setStatus = globalStatus === 'E' ? res.render('home',{name:fullName,status:'Approved'}):res.render('home',{name:fullName,status:'Cancelled'})
})

router.post("/home", (req, res) => {
    let gradStatus = req.body.status;
    if(gradStatus){
        let sql = `Update graduates Set gradStatus='${gradStatus}' where username='${globalUsername}'`
        database.query(sql,(error,result) => {
            if(error){
                throw error
            }
            else{
                let setStatus = gradStatus === 'E' ? res.render('home',{name:fullName,status:'Approved'}):res.render('home',{name:fullName,status:'Cancelled'})
            }
        })
    }
})

module.exports = router;