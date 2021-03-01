let express = require("express");
let basicRoutes = require('./routes/api');
let registerRoute = require('./routes/register');
let logRoute = require('./routes/login');

let app = express();

app.use("/Styling", express.static("Styling")); //gets images and css

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(basicRoutes);
app.use(registerRoute);
app.use(logRoute);

app.delete('/logout', (req, res)=> {
	req.logout();
	res.redirect('/login');
})
//app.get('/register/complete',registerRoute)


//Handling Errors
app.use((req, res, next) =>{
	var error = new Error("Page Not Found")
	error.status = 404;
	next(error);
})

app.use((error, req, res, next) =>{
	res.status(error.status || 500);
	res.send(error.message)
})

app.listen(3000, () => {
	console.log(`Server started on port 3000`);
});