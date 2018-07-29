var express = require('express');
var config = require('./config/config');
var glob = require('glob');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');

var app = express();

//Connect to MongoDB
mongoose.connect(config.db);
var db = mongoose.connection;

//Handle MongoDB Error
db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
});

//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
	mongooseConnection: db
    })
}));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// serve static files from template
app.use(express.static('app/public'));

// include routes
var routes = require('./routes/router');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

//Use Models
var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
    require(model);
});

module.exports = require('./config/express')(app, config);

app.listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
});
