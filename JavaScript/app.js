let express = require("express");
let basicRoutes = require('./routes/api');
let registerRoute = require('./routes/register');
let logRoute = require('./routes/login');
let homeRoute = require('./routes/home')

let app = express();

app.use("/Styling", express.static("Styling")); //gets images and css

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(basicRoutes);
app.use(registerRoute);
app.use(logRoute);
app.use(homeRoute);

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.get('/logout', (req,res,next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

app.listen(3000, () => {
	console.log(`Server started on port 3000`);
});