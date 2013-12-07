var Stat = require('../models/stat.js');
var restify = require('restify')
var mongoose = require('mongoose')


exports.loadData = function(req, res,next){
	try{
		mongoose.connection.db.dropCollection("userstats");
		var users={};
		var ids={};	
		var names = ["points","kills","xp","level","missons_compelte","stage","bonus_points","stat_name_8","stat_name_9","stat_name_10"];
		for(var i = 1;i< 101;i++){
			// generate a ubique username
			do{
				var username = [];
				for(var j = 0;j< 3;j++){
					var max = 97; //ascii a
					var min = 122; //ascii z
					var number = Math.floor(Math.random() * (max - min + 1)) + min;;
					var c = String.fromCharCode(number);
					username.push(c);
				}
			}while(users.hasOwnProperty(username.join("")))
			for(var k=0;k< names.length;k++){
				var d = new Date();
				var stat = new Stat({name:names[k],username:username.join(""), value:Math.floor(Math.random() * d.getMilliseconds()),fbuid:i})
				stat.save();
			}
		}
	}catch(error){
		return next(restify.InternalError(error.message))
	}
		
	res.send("load users");
	return next();
}


