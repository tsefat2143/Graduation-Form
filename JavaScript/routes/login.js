let router = require("express").Router();
let bodyParser = require("body-parser");
let path = require('path');
let database = require('../database');

router.use(bodyParser.urlencoded({extended: false,}));
router.use(bodyParser.json());

router.post("/login", (req, res) => {
	let username = req.body.username;
    let password = req.body.password;

    let sql = `Select * From graduation.graduates Where username = '${username}' AND passwords = '${password}';`;
});

module.exports = router;