const request = require('request');
Person = require("../models/person")

module.exports = {

	findAll: function(callback){

		var result = new Array();
		result.push(
			new Person(
            {
                name:  'Martin Fowler',
                email: 'martin.fowler@email.com',
                age: 54
            }));
		callback(null, result);
	}
}