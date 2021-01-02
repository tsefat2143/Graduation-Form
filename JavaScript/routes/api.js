let router = require('express').Router();

router.get("/", (req, res) => {
	res.render('index');
});

router.get("/contact", (req, res) => {
	res.render('contact');
});

router.get("/register", (req, res) => {
	res.render('register');
});

router.get("/login", (req, res) => {
	res.render('login');
});

module.exports = router;