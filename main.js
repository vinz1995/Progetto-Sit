// var 'ol/ol.css';
var Map = ol.Map;
var OSM = ol.source.OSM;
var VectorSource = ol.source.Vector;
var View = ol.View;
var XYZ = ol.source.XYZ;
var GeoJSON = ol.format.GeoJSON;
var WFS = ol.format.WFS;
var Stroke = ol.style.Stroke;
var Style = ol.style.Style;
var TileLayer = ol.layer.Tile;
var VectorLayer = ol.layer.Vector;


var andFilter = ol.format.filter.and;
var equalToFilter = ol.format.filter.equalTo;
var likeFilter = ol.format.filter.like;




//  const vectorSource = new VectorSource();
//  new ol.layer.Vector({
// source: new ol.source.Vector({
// format: new ol.format.GeoJSON(),
// url: url,
// })
// })
// //   const vectorSource = new VectorSource({
// //   format: new GeoJSON(),
// //   url: function (extent) {
// //     return (
// //       'http://localhost:8080/geoserver/SegnalazioniUtente/ows?service=WFS&version=2.0.0&request=GetFeature&typename=SegnalazioniUtente segnalazioni&outputFormat=application/json&srsname=EPSG:3857'
// //     );
// //   },
// // });
// const vector = new VectorLayer({
//   source: vectorSource,
//   style: new Style({
//     stroke: new Stroke({
//       color: 'rgba(0, 0, 255, 1.0)',
//       width: 2,
//     }),
//   }),
// });

// const mappa = new TileLayer({
//     source: new OSM(),
// });

// const map = new Map({
//   layers: [mappa, vector],
//   target: 'map',
//   view: new View({
//     center: [0, 0],
//     maxZoom: 19,
//     zoom: 2,
//   }),
// });

// // generate a GetFeature request
// var featureRequest = new WFS().writeGetFeature({
//   srsName: 'EPSG:3857',
//   featureNS: 'strade',
//   featurePrefix: 'strade',
//   featureTypes: ['strade'],
//   outputFormat: 'application/json',
//   // filter: andFilter(
//   //   likeFilter('name', 'Mississippi*'),
//   //   equalToFilter('waterway', 'riverbank')
//   // ),
// });

// // // then post the request and add the received features to a layer
// // fetch('https://ahocevar.com/geoserver/wfs', {
// //   method: 'POST',
// //   body: new XMLSerializer().serializeToString(featureRequest),
// // })
// //   .then(function (response) {
// //     return response.json();
// //   })
// //   .then(function (json) {
// //     const features = new GeoJSON().readFeatures(json);
// //     vectorSource.addFeatures(features);
// //     map.getView().fit(vectorSource.getExtent());
// //   });

var vector=new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'http://localhost:8080/geoserver/wfs?' +
            'service=wfs&request=GetFeature' +
            '&typename=strade:strade' +
            '&srsname=EPSG:3003' +
            '&outputFormat=json'
    })
})

const mappa = new TileLayer({
    source: new OSM(),
});
const map = new Map({
  layers: [mappa, vector],
  target: 'map',
  view: new View({
    center: [0, 0],
    maxZoom: 19,
    zoom: 2,
  }),
});

