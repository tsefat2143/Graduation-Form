let database = require('./database');


let check = (email) => {
	let sql = `select graduationID from graduation.graduates where email='${email}'`;
	let size = 0;
	database.query(sql, (error, result) => {
		if(error){
			console.log("SQL ERROR", error);
		}
		if(result.length > 0){
			size = result.length;
		}
	})
		return size;
	}

module.exports = check;