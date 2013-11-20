var map = {};
var tempMarker =  [];
var markers =  [];
var lat = "49.439556958";
var lon = "32.080078125";

function mainMarkers () {

    var jsonData = [];
    var myOptions = { center: new google.maps.LatLng(lat, lon), zoom: 7, mapTypeId: google.maps.MapTypeId.ROADMAP};

    map = new google.maps.Map(document.getElementById("map"), myOptions);

    $.ajax({
        dataType: "json",
        type: "GET",
        url: "/markers"
    })
    .done(function( msg ) {
        jsonData = msg;
        for (var i = 0, length = jsonData.length; i < length; i++) {
            var data = jsonData[i],
                latLng = new google.maps.LatLng(data.lat, data.lon);

            var marker = new google.maps.Marker({ position: latLng, map: map, title: data.name });
            markers.push(marker);
            $('#markersList')
                .append('<option value="'+data._id+'">'+data.name+'</option>');
        }
    });

    google.maps.event.addListener(map, 'click', function(event) {
        if(tempMarker.length > 0){
            tempMarker[0].setMap(null);
            tempMarker = [];
        }
        var temp = new google.maps.Marker({position: event.latLng, map: map});
        tempMarker.push(temp);
        $("#new-marker-latlng").val(event.latLng.ob + ', '+event.latLng.pb);
        $("#lat").val(event.latLng.ob);
        $("#lon").val(event.latLng.pb);
    });
}

function addMarker() {
    var lat = $("#lat").val();
    var lon = $("#lon").val();
    markers.push(tempMarker[0]);
    if(tempMarker.length > 0){
        tempMarker[0].setMap(null);
        tempMarker = [];
    }
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
    var markerCount = $('#markersList option').length;
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/markers",
        data: "lat="+lat+"&lon="+lon+"&name=Marker-"+markerCount
    })
    .done(function( msg ) {
        refreshMarkers();
    });
}

function searchMarkerById(){
    var markerId = $("#markersList option:selected").val();
    if (markerId != 0){
        $.ajax({
            dataType: "json",
            type: "GET",
            url: "/markers/"+markerId
        })
        .done(function( msg ) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            var latLng = new google.maps.LatLng(msg.lat, msg.lon);

            var marker = new google.maps.Marker({ position: latLng, map: map, title: msg.name });
            map.setCenter(new google.maps.LatLng(msg.lat, msg.lon));
            markers.push(marker);

        });
    } else {
        $.ajax({
            dataType: "json",
            type: "GET",
            url: "/markers"
        })
            .done(function( msg ) {
                for (var i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                }
                for (var i = 0, length = msg.length; i < length; i++) {
                    var data = msg[i],
                        latLng = new google.maps.LatLng(data.lat, data.lon);

                    var marker = new google.maps.Marker({ position: latLng, map: map, title: data.name });
                    markers.push(marker);

                }
                map.setCenter(new google.maps.LatLng(lat, lon));
            });
    }
}

function refreshMarkers(){
    $.ajax({
        dataType: "json",
        type: "GET",
        url: "/markers"
    })
        .done(function( msg ) {
            $('#markersList')
                .find('option')
                .remove()
                .end()
                .append('<option value="0">All markers</option>');
            for (var i = 0, length = msg.length; i < length; i++) {
                var data = msg[i];
                $('#markersList').append('<option value="'+data._id+'">'+data.name+'</option>');
            }
        });
}