var assert = require('assert');
var helpers = require('./../custom/helpers')
var mp = require('./../custom/classes/markersProvider');

var mongo = require('mocha-mongo')('mongodb://localhost/markersdb');
var ready = mongo.ready();
var clean = mongo.cleanCollections(['markers']);

describe("markers", function () {

    describe("findAll", function() {
        it("should return array with 2 values", ready(function(db, done) {
            var provider = new mp.MarkersProvider(db);

            provider.findAll(test, error);

            function test(items) {
                console.dir(items.length);
                assert.equal(items.length, 2);
                done();
            }

            function error(msg, err) {
                console.log(msg);
                console.dir(err);
                done(err);
            }
        }));
    });

    describe("findById", function() {
        it("should return 1 marker", ready(function(db, done) {
            var provider = new mp.MarkersProvider(db),
                id = "2";

            provider.findById(id, test, error);

            function test(items) {
                console.dir(items);
                assert.equal(items._id, id);
                done();
            }

            function error(msg, err) {
                console.log(msg);
                console.dir(err);
                done(err);
            }
        }));
    });

    describe("findByLocation", function() {
        it("should return near by markers", ready(function(db, done) {
            var provider = new mp.MarkersProvider(db)
            var lng= parseFloat(30.509);
            var lat= parseFloat(50.471);
            var dist= parseFloat(20);


            provider.findByLocation(lat, lng, dist, test, error);

            function test(items) {
                console.dir(items);
                assert.equal(items.length, 1);
                done();
            }

            function error(msg, err) {
                console.log(msg);
                console.dir(err);
                done(err);
            }
        }));
    });

    describe("addMarker", function() {
        it("should add new marker", ready(function(db, done) {
            var provider = new mp.MarkersProvider(db)

            var newMarker =  [
                {
                    "_id": "3",
                    "name": "Marker-3-test",
                    "loc": {
                        "lng": 34.52744,
                        "lat": 53.51911
                    }
                }
            ];

            provider.addMarker(newMarker, test, error);

            function test(items) {
                console.dir(items);
                assert.equal(items, newMarker);
                done();
            }

            function error(msg, err) {
                console.log(msg);
                console.dir(err);
                done(err);
            }
        }));
    });
});
