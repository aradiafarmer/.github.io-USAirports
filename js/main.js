// 1. Create variable mymap
var mymap = L.map('map', {
    center: [40.310032, -100.922839], // somewhere in Nebraska
    zoom: 4,
    maxZoom: 10,
    minZoom: 1,
    detectRetina: true});
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mymap);

// 3. Add airports GeoJSON Data
var airports = null;
var colors = chroma.scale('RdYlGn').mode('lch').colors(2);
for (i = 0; i < 2; i++) {
    $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
}
// Get GeoJSON and put on it on the map when it loads
airports= L.geoJson.ajax("assets/airports.geojson",{
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.AIRPT_NAME);
    },
    pointToLayer: function (feature, latlng) {
        var id = 0;
        if (feature.properties.CNTL_TWR == "N") { id = 0; }
        else  { id = 1; }
        return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-plane marker-color-' + (id + 1).toString() })});
    },
    attribution: 'Airports Data &copy; Mike Bostock | US States &copy; Mike Bostock | Base Map &copy; CartoDB | Made By Aradia Farmer'
});
colors = chroma.scale('Purples').colors(5);
function setColor(density) {
    var id = 0;
    if (density > 20) { id = 4; }
    else if (density > 15 && density <= 20) { id = 3; }
    else if (density > 10 && density <= 15) { id = 2; }
    else if (density > 5 &&  density <= 10) { id = 1; }
    else  { id = 0; }
    return colors[id];
}
function style(feature) {
    return {
        fillColor: setColor(feature.properties.count),
        fillOpacity: 0.4,
        weight: 2,
        opacity: 1,
        color: '#b4b4b4',
        dashArray: '4'
    };
}
var states = null;
states=L.geoJson.ajax("assets/us-states.geojson", {
    style: style
}).addTo(mymap);

// Add the airports to the map.
airports.addTo(mymap);

var legend = L.control({position: 'topright'});
legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<b># Airports </b><br />';
    div.innerHTML += '<i style="background: ' + colors[4] + '; opacity: 0.5"></i><p>20+</p>';
    div.innerHTML += '<i style="background: ' + colors[3] + '; opacity: 0.5"></i><p>15-19</p>';
    div.innerHTML += '<i style="background: ' + colors[2] + '; opacity: 0.5"></i><p>10-14</p>';
    div.innerHTML += '<i style="background: ' + colors[1] + '; opacity: 0.5"></i><p> 5-9</p>';
    div.innerHTML += '<i style="background: ' + colors[0] + '; opacity: 0.5"></i><p> 0- 4</p>';
    div.innerHTML += '<hr><b>Air Traffic Control Tower<b><br />';
    div.innerHTML += '<i class="fa fa-wifi marker-color-1"></i><p>N</p>';
    div.innerHTML += '<i class="fa fa-wifi marker-color-2"></i><p>Y</p>';
    return div;
};
// 11. Add a legend to map
legend.addTo(mymap);

// 12. Add a scale bar to map
L.control.scale({position: 'bottomleft'}).addTo(mymap);
