var map = {};
var tempMarker =  [];
var markers =  [];
var lat = "49.439556958";
var lng = "32.080078125";

function mainMarkers () {

    var jsonData = [];
    var myOptions = { center: new google.maps.LatLng(lat, lng), zoom: 7, mapTypeId: google.maps.MapTypeId.ROADMAP};

    map = new google.maps.Map(document.getElementById("map"), myOptions);

    $.ajax({
        dataType: "json",
        type: "GET",
        url: "/markers"
    })
    .done(function( msg ) {
        jsonData = msg;
        for (var i = 0, length = jsonData.result.length; i < length; i++) {
            var data = jsonData.result[i],
                latLng = new google.maps.LatLng(data.lat, data.lng);

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
        $("#lng").val(event.latLng.pb);
    });
}

function addMarker() {
    var latAdd = $("#lat").val();
    var lngAdd = $("#lng").val();

    if(latAdd && lngAdd){

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
            data: "lat="+latAdd+"&lng="+lngAdd+"&name=Marker-"+markerCount
        })
        .done(function( msg ) {
            refreshMarkers();
            alert ("Marker"+markerCount+" added");
        });
    } else {
        alert ("Lat and Lng should not be empty.");
    }
}

function searchMarkerById(){
    var markerId = $("#markersList option:selected").val();
    if(tempMarker.length > 0){
        tempMarker[0].setMap(null);
        tempMarker = [];
    }
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
            var latLng = new google.maps.LatLng(msg.result.lat, msg.result.lng);

            var marker = new google.maps.Marker({ position: latLng, map: map, title: msg.result.name });
            map.setCenter(new google.maps.LatLng(msg.result.lat, msg.result.lng));
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
                for (var i = 0, length = msg.result.length; i < length; i++) {
                    var data = msg.result[i],
                        latLng = new google.maps.LatLng(data.lat, data.lng);

                    var marker = new google.maps.Marker({ position: latLng, map: map, title: data.name });
                    markers.push(marker);

                }
                map.setCenter(new google.maps.LatLng(lat, lng));
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
            for (var i = 0, length = msg.result.length; i < length; i++) {
                var data = msg.result[i];
                $('#markersList').append('<option value="'+data._id+'">'+data.name+'</option>');
            }
        });
}