var helpers = require('./helpers'),
    Markers = require('./classes/markersProvider');


exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('find marker by id - ' + id);
    if(!id) return helpers.sendError(400, "ID is unknown", res);

    var provider = new Markers.MarkersProvider(db);

    provider.findById(id, function(item) {
        helpers.sendResponse(item, res);
    }, function(msg, err) {
        console.log(err);
        helpers.sendError(400, section + msg, response);
    });

};

exports.findAll = function(req, res) {
    console.log(module);
    var provider = new Markers.MarkersProvider(db);
    console.log('find all markers');
    provider.findAll(function(item) {
        helpers.sendResponse(item, res);
    }, function(msg, err) {
        console.log(err);
        helpers.sendError(400, section + msg, response);
    });
};

exports.addMarker = function(req, res) {
    var marker = req.body;
    console.log('add markers - ' + marker);

    if(!marker) return helpers.sendError(400, "Marker is unknown", res);

    var provider = new Markers.MarkersProvider(db);
    provider.addMarker(marker, function(item) {
        helpers.sendResponse(item, res);
    }, function(msg, err) {
        console.log(err);
        helpers.sendError(400, section + msg, response);
    });

}

exports.findByLocation = function(req, res) {
    var lat = req.params.lat;
    var lng = req.params.lng;

    // max distance for near by placed markers (km)
    var dist = 20;

    console.log('find by location - lat, lng: ' + lat + ', ' + lng);

    if(!lat && !lng) return helpers.sendError(400, "Marker is unknown", res);

    var provider = new Markers.MarkersProvider(db);
    provider.findByLocation(parseFloat(lat), parseFloat(lng), parseFloat(dist), function(item) {
        helpers.sendResponse(item, res);
    }, function(msg, err) {
        console.log(err);
        helpers.sendError(400, section + msg, response);
    });

}