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

app.listen(3000, () => {
	console.log(`Server started on port 3000`);
});