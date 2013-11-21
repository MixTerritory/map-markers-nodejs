// populate markers
exports.populateMarkers = function() {

    db.collection('markers', {strict:true}, function(err, collection) {
        if (err) {
            console.log("Creating sample markers");
            populateMarkersSampleData();
        }
    });

    function populateMarkersSampleData (){

        var markers = [
            {
                _id: 1,
                name: "Marker-1",
                lat: "50.51911",
                lng: "30.52744"
            },
            {
                _id: 2,
                name: "Marker-2",
                lat: "49.44911",
                lng: "32.05744"
            }];

        db.collection('markers', function(err, collection) {
            collection.insert(markers, {safe:true}, function(err, result) {});
        });

    }

}

