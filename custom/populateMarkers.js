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
                name: "Marker-1",
                loc: {
                    lng: 30.509033203125,
                    lat: 50.47149085139956
                }
            },
            {
                name: "Marker-2",
                loc: {
                    lng: 32.047119140625,
                    lat: 49.468124067331644
                }
            }];

        db.collection('markers', function(err, collection) {
            collection.insert(markers, {safe:true}, function(err, result) {});
        });

    }

}

