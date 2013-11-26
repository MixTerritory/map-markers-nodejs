
function MarkersProvider(db) {
    this.db = db;
}

var func = function(){};

MarkersProvider.prototype.getCollection = function (success, fail) {
    this.db.collection('markers', function (error, collection) {
        if (error) {
            fail("Get collection error", error);
        }
        else success(collection);
    });
};

MarkersProvider.prototype.findById = function(id ,success, fail) {
    success = (typeof success === 'function' ? success : func);
    fail = (typeof fail === 'function' ? fail : func);

    if(id.length === 24) {
        id = require('mongodb').ObjectID.createFromHexString(id);
    }

    this.getCollection(function (collection) {
        collection.findOne({'_id': id}, function(err, item) {
            success(item);
        });
    }, fail);
};


MarkersProvider.prototype.findAll = function(success, fail) {
    success = (typeof success === 'function' ? success : func);
    fail = (typeof fail === 'function' ? fail : func);

    this.getCollection(function (collection) {
        collection.find().toArray(function(err, items) {
            success(items);
        });
    }, fail);
};

MarkersProvider.prototype.addMarker = function(marker, success, fail) {

    success = (typeof success === 'function' ? success : func);
    fail = (typeof fail === 'function' ? fail : func);

    this.getCollection(function (collection) {
        collection.insert(marker, {safe:true}, function(err, result) {
                success(result);
        });
    }, fail);
}


MarkersProvider.prototype.findByLocation = function (lat, lng, dist, success, fail) {

    success = (typeof success === 'function' ? success : func);
    fail = (typeof fail === 'function' ? fail : func);

    dist = dist / 111.12;
    this.getCollection(function (collection) {
            collection.find({ loc: { $near:[lng, lat], $maxDistance: dist }}).toArray(function(err, items) {
                    success(items);
                });
        },
        fail);
};


exports.MarkersProvider = MarkersProvider;