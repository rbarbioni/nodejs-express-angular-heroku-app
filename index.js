// DECLARATIONS
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

// APPLICATION ROUT DECLARATION
var persons = require('./app/controllers/persons');


// APPLICATION ROUTE SETUP
app.use('/persons', persons);


// PAGE SETUP
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '/app/views')));

// APPLICATION SETUP
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// DEFAULT HANDLERS
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// SINGLE PAGE APPLICATION INDEX (ANGULAR-JS)
app.get('/', function(req, res) {
  res.render('app/views/index')
});

// HEROKU SETUP
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

