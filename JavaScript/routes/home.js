let router = require('express').Router();
let bodyParser = require('body-parser');
let validAuthentication = require('../auth')

router.use(bodyParser.urlencoded({extended: false,}));
router.use(bodyParser.json());

router.get("/home", (req, res) => {
	res.render('home');
});

router.post('/home', (req, res) => {
	let enroll = req.body.E;
	let cancel = req.body.C;


})

module.exports = router;