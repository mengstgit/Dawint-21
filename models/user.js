const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userShema = mongoose.Schema({
	 name : {
	 	type: String
	 },
	 email : {
	 	type: String,
	 	unique: true,
	 	uppercase : true
	 },
	 subject : {
	 	type: String
	 },
     message : {
    	type : String
    }
});

const User = module.exports = mongoose.model('User', userShema);