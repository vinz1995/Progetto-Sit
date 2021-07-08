var ImageWMS = ol.source.ImageWMS;
var Map = ol.Map;
var OSM = ol.source.OSM;
var View = ol.View;
var ImageLayer  = ol.layer.Image;
var TileLayer =ol.layer.Tile;
var Feature = ol.Feature;
var Geolocation = ol.Geolocation;
var Point = ol.geom.Point;
// var {Circle as CircleStyle, Fill, Stroke, Style} = ol.style;
var CircleStyle=ol.style.Circle;
var Fill=ol.style.Fill;
var Stroke=ol.style.Stroke;
var Style=ol.style.Style;
var proj=ol.proj;
//var toStringHDMS=ol.coordinate.toStringHDMS;
var toLonLat=ol.proj.toLonLat;
// var {OSM, Vector as VectorSource} = ol.source;
var VectorSource=ol.source.Vector;
var VectorLayer = ol.layer.Vector;

var view = new View({
  center: [0,0],
  zoom: 2,
});

var map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }) ],
  target: 'map',
  view: view,
});

var geolocation = new Geolocation({
  // enableHighAccuracy must be set to true to have the heading value.
  trackingOptions: {
    enableHighAccuracy: true,
  },
  projection: view.getProjection(),
});

function el(id) {
  return document.getElementById(id);
}

el('track').addEventListener('change', function () {
  geolocation.setTracking(this.checked);
});

// update the HTML page when the position changes.
geolocation.on('change', function () {
  el('accuracy').innerText = geolocation.getAccuracy() + ' [m]';
  el('position').innerText = geolocation.getPosition();
  document.getElementById('coordinate').value = toLonLat(geolocation.getPosition()).split(',');
  //document.cookie="profile_viewer_uid="+geolocation.getPosition();
  // el('altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]';
  // el('heading').innerText = geolocation.getHeading() + ' [rad]';
  // el('speed').innerText = geolocation.getSpeed() + ' [m/s]';
});

// handle geolocation error.
geolocation.on('error', function (error) {
  var info = document.getElementById('info');
  info.innerHTML = error.message;
  info.style.display = '';
});

var accuracyFeature = new Feature();
geolocation.on('change:accuracyGeometry', function () {
  accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
});

var positionFeature = new Feature();
positionFeature.setStyle(
  new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({
        color: '#3399CC',
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 2,
      }),
    }),
  })
);

geolocation.on('change:position', function () {
  var coordinates = geolocation.getPosition();
  positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
});

new VectorLayer({
  map: map,
  source: new VectorSource({
    features: [accuracyFeature, positionFeature],
  }),
});