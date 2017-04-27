const request = require('request');
Person = require("../models/person")

module.exports = {

	findAll: function(req, res, callback){
		new Person({}).findAll(req, callback);
	},

	findById: function(req, res, callback){
		findById(req, callback);
	},

	delete: function(req, res, callback){
		findById(req, 
			function(err, result){
				if(result.length > 0){
					new Person({}).delete(req, 
						function(err, result){
							callback(err, result);
						}
					);	
				}else{
					callback(err, result);
				}
			}
		);
	},

	create: function(req, callback){
		var person = new Person(req.body);
		person.insert(req,
			function(err, result){
				person.id = result.insertId;
				callback(err, person);
			}
		);
	},

	updatePart: function(req, callback){
		findById(req, 
			function(err, result){
				if(result.length == 0){
					callback(err, result);
				}else{
					var person = new Person(req.body);
					person.id = result[0].id;
					person.update(req, 
						function(err, result){																
							callback(err, person);
						}						
					);
				}
			}
		);		
	},
	update: function(req, callback){

		if(req.params.id == null){
			var person = new Person(req.body)
			person.insert(req,
				function(err, result){
					person.id = result.insertId;
					callback(err, person);
				}
			);				
		}else{
			findById(req, 
				function(err, result){
					if(result.length == 0){
						person.insert(req,
							function(err, result){
								person.id = result.insertId;
								callback(err, person);
							}
						);	

					}else{
						var person = new Person(req.body);
						person.id = result[0].id;
						person.update(req, 
							function(err, result){																
								callback(err, person);
							}						
						);
					}
				}
			);
		}
	}
}

function findById(req, callback){
	new Person({}).findById(req, 
		function(err, result){
			if (err) throw err;
			callback(err,result);
		}
	);
}