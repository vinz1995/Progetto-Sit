// var ImageWMS = ol.source.ImageWMS;
// var Map = ol.Map;
// var OSM = ol.source.OSM;
// var View = ol.View;
// var ImageLayer = ol.layer.Image;
// var TileLayer = ol.layer.Tile;
// var Feature = ol.Feature;
// var Geolocation = ol.Geolocation;
// var Point = ol.geom.Point;
// // var {Circle as CircleStyle, Fill, Stroke, Style} = ol.style;
// var CircleStyle = ol.style.Circle;
// var Fill = ol.style.Fill;
// var Stroke = ol.style.Stroke;
// var Style = ol.style.Style;
// var proj = ol.proj;
// var toStringXY = ol.coordinate.toStringXY;
// var toStringHDMS = ol.coordinate.toStringHDMS;
// var toLonLat = ol.proj.toLonLat;
// var fromLonLat = ol.proj.fromLonLat;
// // var {OSM, Vector as VectorSource} = ol.source;
// var VectorSource = ol.source.Vector;
// var VectorLayer = ol.layer.Vector;

// var Draw = ol.interaction.Draw;


// var view = new View({
//     center: [0, 0],
//     zoom: 2,
// });


// var map = new Map({
//     layers: [
//         new TileLayer({
//             source: new OSM(),
//         }),
//         new ImageLayer({
//             source: new ImageWMS({
//                 ratio: 1,
//                 url: 'http://localhost:8080/geoserver/Strade/wms',
//                 params: {
//                     'VERSION': '1.1.1',
//                     "STYLES": '',
//                     "LAYERS": 'Strade:Strade',
//                     "exceptions": 'application/vnd.ogc.se_inimage',
//                 }
//             })
//         })
//     ],
//     target: 'map',
//     view: view,
// });

// var geolocation = new Geolocation({
//     // enableHighAccuracy must be set to true to have the heading value.
//     trackingOptions: {
//         enableHighAccuracy: true,
//     },
//     projection: view.getProjection(),
// });

// function el(id) {
//     return document.getElementById(id);
// }

// el('track').addEventListener('change', function() {
//     geolocation.setTracking(this.checked);
// });

// // update the HTML page when the position changes.
// geolocation.on('change', function() {
//     el('accuracy').innerText = geolocation.getAccuracy() + ' [m]';

//     var coo = toStringXY(toLonLat(geolocation.getPosition()), 10).split(',');

//     document.getElementById('lat').value = coo[1];
//     document.getElementById('lon').value = coo[0];
//     //document.cookie="profile_viewer_uid="+geolocation.getPosition();
//     // el('altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]';
//     // el('heading').innerText = geolocation.getHeading() + ' [rad]';
//     // el('speed').innerText = geolocation.getSpeed() + ' [m/s]';

//         map.setView(new ol.View({
//               //center: [1795941.70, 4709367.44],
//               center: fromLonLat(toLonLat(geolocation.getPosition())),
//               zoom: 17,
//        }));

// });

// // handle geolocation error.
// geolocation.on('error', function(error) {
//     var info = document.getElementById('info');
//     info.innerHTML = error.message;
//     info.style.display = '';
// });

// var accuracyFeature = new Feature();
// geolocation.on('change:accuracyGeometry', function() {
//     accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
// });

// var positionFeature = new Feature();
// positionFeature.setStyle(
//     new Style({
//         image: new CircleStyle({
//             radius: 6,
//             fill: new Fill({
//                 color: '#3399CC',
//             }),
//             stroke: new Stroke({
//                 color: '#fff',
//                 width: 2,
//             }),
//         }),
//     })
// );

// geolocation.on('change:position', function() {
//     var coordinates = geolocation.getPosition();
//     positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
// });

// new VectorLayer({
//     map: map,
//     source: new VectorSource({
//         features: [accuracyFeature, positionFeature],
//     }),
// });

// map.on('dblclick', function(evt) {
//     var coordinate = evt.coordinate;
//     var clickC = toStringXY(toLonLat(coordinate), 10).split(',');
//     document.getElementById('lat').value = clickC[1];
//     document.getElementById('lon').value = clickC[0];
//     // var hdms = toStringHDMS(toLonLat(coordinate));
//     // document.getElementById('coordinate').value=hsms;
//     var punto = new Point(coordinate);
//     positionFeature.setGeometry(punto);

//     map.setView(new ol.View({
//               //center: [1795941.70, 4709367.44],
//               center: fromLonLat(toLonLat(coordinate)),
//               zoom: 17,
//        }));

// });
// // var source = new VectorSource({ wrapX: false });

// //     var vector = new VectorLayer({
// //         source: source,
// //     });
// //     var typeSelect = document.getElementById('type');

// //     var draw; // global so we can remove it later
// //     function addInteraction() {
// //         var value = typeSelect.value;
// //         if (value !== 'None') {
// //             draw = new Draw({
// //                 source: source,
// //                 type: typeSelect.value,
// //             });
// //             map.addInteraction(draw);
// //         }
// //     }

// //     /**
// //      * Handle change event.
// //      */
// //     typeSelect.onchange = function() {
// //         map.removeInteraction(draw);
// //         addInteraction();
// //     };

// //     // document.getElementById('undo').addEventListener('click', function() {
// //     //     draw.removeLastPoint();
// //     // });

// //     addInteraction();


// var projectionSelect = document.getElementById('projection');
// projectionSelect.addEventListener('change', function(event) {
//     mousePositionControl.setProjection(event.target.value);
// });

// var precisionInput = document.getElementById('precision');
// precisionInput.addEventListener('change', function(event) {
//     var format = ol.coordinate.createStringXY(event.target.valueAsNumber);
//     mousePositionControl.setCoordinateFormat(format);
// });

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
        center: [-11000000, 4600000],
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
    if (value !== 'None') {
        draw = new Draw({
            source: source,
            type: typeSelect.value,
        });
        map.addInteraction(draw);
        
    }
}

//web 
var Polygon = ol.geom.Polygon;

var feature = new Feature({
  geometry: new Polygon(polyCoords),
  labelPoint: new Point(labelCoords),
  name: 'My Polygon'
});

// get the polygon geometry
var poly = feature.getGeometry();

// Render the feature as a point using the coordinates from labelPoint
feature.setGeometryName('labelPoint');

// get the point geometry
var point = feature.getGeometry();

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

document.getElementById('undo').addEventListener('click', function() {
    draw.removeLastPoint();
});

//feature

