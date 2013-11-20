var mongo = require('mongodb');

var server = new mongo.Server('localhost', 27017, {auto_reconnect: true});
db = new mongo.Db('markersdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("connected.");
        /*db.collection("markers").remove({},function(err, removed){
            console.log("removed: " + removed);
        });*/
        db.collection('markers', {strict:true}, function(err, collection) {
            if (err) {
                console.log("not exists.");
                newestDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('get marker: ' + id);
    db.collection('markers', function(err, collection) {
        collection.findOne({'_id':new mongo.BSONPure.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('markers', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addMarker = function(req, res) {
    var marker = req.body;
    console.log('make: ' + marker);
    console.log('add: ' + JSON.stringify(marker));
    db.collection('markers', function(err, collection) {
        collection.insert(marker, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'error'});
            } else {
                console.log('success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

var newestDB = function() {

    var markers = [
        {
            name: "Marker-1",
            lat: "50.51911",
            lon: "30.52744"
        },
        {
            name: "Marker-2",
            lat: "49.44911",
            lon: "32.05744"
        }];

    db.collection('markers', function(err, collection) {
        collection.insert(markers, {safe:true}, function(err, result) {});
    });

};