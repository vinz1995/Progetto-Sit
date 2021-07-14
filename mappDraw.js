var ImageWMS = ol.source.ImageWMS;
var Map = ol.Map;
var OSM = ol.source.OSM;
var View = ol.View;
var ImageLayer = ol.layer.Image;
var TileLayer = ol.layer.Tile;
var Feature = ol.Feature;
var Geolocation = ol.Geolocation;
var Point = ol.geom.Point;
// var {Circle as CircleStyle, Fill, Stroke, Style} = ol.style;
var CircleStyle = ol.style.Circle;
var Fill = ol.style.Fill;
var Stroke = ol.style.Stroke;
var Style = ol.style.Style;
var proj = ol.proj;
var toStringXY = ol.coordinate.toStringXY;
var toStringHDMS = ol.coordinate.toStringHDMS;
var toLonLat = ol.proj.toLonLat;
var fromLonLat = ol.proj.fromLonLat;
// var {OSM, Vector as VectorSource} = ol.source;
var VectorSource = ol.source.Vector;
var VectorLayer = ol.layer.Vector;

var Draw = ol.interaction.Draw;
var Polygon = ol.geom.Polygon;

const raster = new TileLayer({
    source: new OSM(),
});

const source = new VectorSource({
    // features: [accuracyFeature, positionFeature]
});

const vector = new VectorLayer({
    source: source,
});

var view = new View({
    center: [0, 0],
    zoom: 4,
})

// new VectorLayer({
//     map: map,
//     source: new VectorSource({
//         features: [accuracyFeature, positionFeature],
//     }),
// });

const map = new Map({
    layers: [raster, vector],
    target: 'map',
    view: view
});


const typeSelect = document.getElementById('type');



let draw; // global so we can remove it later
function addInteraction() {
    const value = typeSelect.value;
    var p = new Feature();
    if (value !== 'None') {
        draw = new Draw({
            source: source,
            type: typeSelect.value,
            geometryName: 'ciao',
        });

        draw.on('drawend', function(e) {

            //in evt you will get ol.feature 

            // from ol.feature get the geometry and than get coordinates 
            // poly = new Feature({
            //     geometry: new Polygon(polyCoords),
            // })
            var a=e.feature.getGeometry().getCoordinates();
            console.log(a[0][1]);
            console.log(a[0][1][0]);
            // console.log(JSON.stringify(e.feature.getGeometry().getCoordinates()));
        });
        map.addInteraction(draw);


    }
}


// map.addInteraction(new Draw({
//   type: 'Polygon',
//   source: source
// }));

/**
 * Handle change event.
 */


typeSelect.onchange = function() {
    map.removeInteraction(draw);
    if (typeSelect.value === "Polygon") {

        addInteraction();

    } else {
        // map.on('singleclick', function(evt) {
        //     var coordinate = evt.coordinate;
        //     var clickC = toStringXY(toLonLat(coordinate), 10).split(',');
        //     document.getElementById('lat').value = clickC[1];
        //     document.getElementById('lon').value = clickC[0];
        //     // var hdms = toStringHDMS(toLonLat(coordinate));
        //     // document.getElementById('coordinate').value=hsms;
        //     var punto = new Point(coordinate);
        //     positionFeature.setGeometry(punto);

        //     map.setView(new ol.View({
        //         //center: [1795941.70, 4709367.44],
        //         center: fromLonLat(toLonLat(coordinate)),
        //         zoom: 17,
        //     }));

        // });
    }

};

// document.getElementById('undo').addEventListener('click', function() {
//     draw.removeLastPoint();
// });

//feature