var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var map = document.getElementById("map_canvas");

function resize(w, h){
    map.style.width = w + "px";
    map.style.height = h + "px";
}

window.onresize = function(){
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    resize(WIDTH, HEIGHT);
}

if (Modernizr.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
        var latlng = google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var myOptions = {
            zoom: 8,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            disableDefaultUI: true
        };
        var map = new google.maps.Map(map,myOptions);
    });
} else {
    var para = document.createElement('p');
    para.textContent = 'Argh, no geolocation!';
    document.body.appendChild(para);
}

resize(WIDTH, HEIGHT);