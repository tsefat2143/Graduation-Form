let express = require("express");
let basicRoutes = require('./routes/api');
let registerRoute = require('./routes/register');
let logRoute = require('./routes/login');

let app = express();

app.use("/Styling", express.static("Styling")); //gets images and css

app.set('views', './Ejs');
app.set('view engine', 'ejs');

app.use("/", basicRoutes);
app.use("/contact", basicRoutes);
app.use("/register", basicRoutes);
app.use("/login", basicRoutes);

app.use("/register", registerRoute);
app.use("/login", logRoute);

app.get('/complete',registerRoute);
//app.get('/register/complete',registerRoute)
app.listen(3000, () => {
	console.log(`Server started on port 3000`);
});