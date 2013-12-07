// The Stat model
 
var mongoose = require('mongoose')
,Schema = mongoose.Schema;

 
var statSchema = new Schema({
	fbuid: Number,
	created_at: {type: Date, default: Date.now},
	value: Number,
	name:  String,
	username: String
},{ autoIndex: true });

statSchema.index({fbuid:1});
statSchema.index({username:1});
statSchema.index({name:1}); 
statSchema.index({username:1},{name:1}); 
module.exports = mongoose.model('UserStat', statSchema);