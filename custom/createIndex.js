exports.createIndexes = function(req, res) {

    db.collection('markers', {strict:true}, function(err, collection) {
        if(err) return console.log(err);
        console.log("Start creating indexes.")
        collection.ensureIndex({"loc":"2d"}, {min: -180, max: 180 });
    });




    var body = 'in progress...';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', body.length);
    res.end(body);

}