// 1. Create a map object.
var mymap = L.map('map', {
    crs: mycrs,
    center: [40.310032, -100.922839], // somewhere in Nebraska
    zoom: 4.5, // is this a good zoom level?
    maxZoom: 10,
    minZoom: 3,
    detectRetina: true});

// 2. Add a base map.
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mymap);

