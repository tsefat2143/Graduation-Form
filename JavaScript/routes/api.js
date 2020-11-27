let router = require('express').Router();
let path = require("path");

//Each route opens the different html files in the HTML folder

router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../../HTML/index.html"));
});

router.get("/contact", (req, res) => {
	res.sendFile(path.join(__dirname, "../../HTML/contact.html"));
});

router.get("/register", (req, res) => {
	res.sendFile(path.join(__dirname, "../../HTML/register.html"));
});

router.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, "../../HTML/login.html"));
});

module.exports = router;