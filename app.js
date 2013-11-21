/**
 * Module dependencies.
 */

var express = require('express');
var markers = require('./custom/markers');
var http = require('http');
var path = require('path');

var app = express();

var mongo = require('mongodb');
var sampleData = require('./custom/populateMarkers');
var Server = mongo.Server;
var Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('markersdb', server);
db.open(function(err, db) {
    if (err) {
        console.log("Failed to connect to MongoDB database");
        throw (err);
    }
    db.authenticate("root", "", function (err, replies) {
        console.log("Connected to Mongo database - markersdb");
        sampleData.populateMarkers();
    });
});



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.errorHandler());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req,res){
    res.render("index.ejs", {layout: false});
});

//markers API routes
app.get('/markers', markers.findAll);
app.get('/markers/:id', markers.findById);
app.post('/markers', markers.addMarker);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
