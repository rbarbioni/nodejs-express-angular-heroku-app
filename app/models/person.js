

var Person = function Person(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.age = data.age;
}

Person.prototype.findAll = function (req, callback) {
    var self = this;
    req.getConnection(
        function(err, connection){
            if (err) throw err;
            connection.query('SELECT p.* FROM person p', [], callback)
        }
    );
}

Person.prototype.findById = function (req, callback) {
    var self = this;
    req.getConnection(
        function(err, connection){
            if (err) throw err;
            connection.query('SELECT p.* FROM person p WHERE p.id = ?', [req.params.id], callback);
        }
    );
}

Person.prototype.delete = function (req, callback) {
    var self = this;
    req.getConnection(
        function(err, connection){
            if (err) throw err;
            connection.query('DELETE FROM person WHERE id = ?', [req.params.id], callback);
        }
    );
}

Person.prototype.insert = function (req, callback) {
    var self = this;
    req.getConnection(
        function(err, connection){
            if (err) throw err;
            connection.query('INSERT INTO person SET ?', self, callback);
        }
    );
}

Person.prototype.update = function (req, callback) {
    var self = this;    
    req.getConnection(
        function(err, connection){
            if (err) throw err;
            connection.query("UPDATE person SET ? WHERE id=?", [req.body, req.params.id], callback)
        }
    );
}


module.exports = Person;