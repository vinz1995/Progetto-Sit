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
var GeoJSON = ol.format.GeoJSON;

var Draw = ol.interaction.Draw;
var Polygon = ol.geom.Polygon;
var format = new ol.format.WKT();

var view = new View({
    center: [0, 0],
    zoom: 2,
});

const mappa = new TileLayer({
    source: new OSM(),
});

var vector = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'http://localhost/SitoSit/proxy.php?' +
            'url=http://localhost:8080/geoserver/wfs&'
            +'service=wfs&request=GetFeature' +
            '&typename=SegnalazioniUtente:segnalazioni' +
            '&srsname=EPSG:3857' +
            '&outputFormat=json'
    })
});

var map = new Map({
    layers: [mappa, vector],
    target: 'map',
    view: view,
});

// var vector = new ol.layer.Vector({
//     source: new ol.source.Vector({
//         format: new ol.format.GeoJSON(),
//         url: 'http://localhost/SitoSit/proxy.php?' +
//             'url=http://localhost:8080/geoserver/wfs&'
//             +'service=wfs&request=GetFeature' +
//             '&typename=SegnalazioniUtente:segnalazioni' +
//             '&srsname=EPSG:3857' +
//             '&outputFormat=json'
//     })
// });

// const vectorSource = new VectorSource();
// const vector = new VectorLayer({
//   source: vectorSource,
//   style: new Style({
//     stroke: new Stroke({
//       color: 'rgba(0, 0, 255, 1.0)',
//       width: 2,
//     }),
//   }),
// });

var featureRequest = new ol.format.WFS().writeGetFeature({
    srsName: 'EPSG:3857',
    featureNS: 'SegnalazioniUtente',
    featurePrefix: 'segnalazioni',
    featureTypes: ['segnalazioni'],
    outputFormat: 'application/json',
    // filter: ol.format.filter.like('email', 'vi@gmail.com'),
});

// var map = new Map({
//     layers: [mappa, vector],
//     target: 'map',
//     view: view,
// });

fetch('http://localhost:8080/geoserver/wfs', {
	// url:'http://localhost/SitoSit/proxy.php?'
  method: 'POST',
  body: new XMLSerializer().serializeToString(featureRequest),
})
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    const features = new GeoJSON().readFeatures(json);
    vectorSource.addFeatures(features);
    map.getView().fit(vectorSource.getExtent());
  });