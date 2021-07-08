
var ImageWMS = ol.source.ImageWMS;
var Map = ol.Map;
var OSM = ol.source.OSM;
var View = ol.View;
var Image  = ol.layer;
var Tile =ol.layer.Tile;

var layers = [
  new TileLayer({
    source: new OSM(),
  }),
  new ImageLayer({
    extent: [-13884991, 2870341, -7455066, 6338219],
    source: new ImageWMS({
      url: 'https://ahocevar.com/geoserver/wms',
      params: {'LAYERS': 'topp:states'},
      ratio: 1,
      serverType: 'geoserver',
    }),
  }) ];
var map = new Map({
  layers: layers,
  target: 'map',
  view: new View({
    center: [-10997148, 4569099],
    zoom: 4,
  }),
});