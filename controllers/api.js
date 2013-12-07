var Stat = require('../models/stat.js');
var restify = require('restify');
exports.index = function(req, res,next){
	res.send("index");
	return next();
}

exports.sendStat = function(req, res,next) {
   if (!req.params.value){
		return next(new restify.MissingParameterError("value is required"));
	}
	if (!req.params.name){
		return next(new restify.MissingParameterError("name is required"));
	}
	if (!req.params.username){
		return next(new restify.MissingParameterError("username is required"));
	}
	var value = req.params.value;
	var intRegex = /^\d+$/;
	if (!(intRegex.test(value)))
	{
		return next(new restify.InvalidArgumentError("value is invalid"));
	}
	try{
		Stat.findOne({name:req.params.name,username:req.params.username},function(error,stat){
			if (error){
				return next(new restify.InternalError(error.message));				
			}
			else{
				if (!stat){
					stat = new Stat({name:req.params.name,username:req.params.username, value:req.params.value});
					stat.save();
				}else{
					stat.value = req.params.value;
					stat.save();					
				}				
			}
		})
	}	
	catch (e){
		return next(new restify.InternalError(e.message));
		
	}
	res.send({"success":true});
	return next();
}
 
exports.getStats = function(req, res,next) {
	Stat.find({username: req.params.username}).exec(function(error, stats) {
		if(error){
			return next(new restify.InternalError(error.mesage));
		}
		res.send(stats);
		return next();
	});
}
 
 
 
exports.getLeaderBoard = function(req, res,next) {
	Stat.find({name: req.params.name}).sort('-value').exec(function(error, stats){
		if(error){
			return next(new restify.InternalError(error.mesage));
		}
		ranks = [];
		for(var i =0;i < stats.length;i++){
			var rank = {"username":stats[i]["username"],"value":stats[i]["value"],"ranking":i+1};
			ranks.push(rank);
		}
		res.send(ranks);
		return next();		
	});
}
  
  
