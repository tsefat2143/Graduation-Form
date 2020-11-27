let express = require("express");
let bcrypt = require("bcrypt");
let basicRoutes = require('./routes/api');
let registerRoute = require('./routes/register');

let app = express();

app.use("/Styling", express.static("Styling")); //gets images and css

app.get("/", basicRoutes);
app.get("/contact", basicRoutes);
app.get("/register", basicRoutes);
app.get("/login", basicRoutes);

app.post("/register", registerRoute);

app.listen(3000, () => {
	console.log(`Server started on port 3000`);
});