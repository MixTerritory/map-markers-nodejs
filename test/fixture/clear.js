var fixtures = require('pow-mongodb-fixtures').connect("markersdb");

fixtures.clear(['markers'], function(err) {
    console.log("clearing data");
    process.exit(0);
});