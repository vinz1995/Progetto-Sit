import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import WKT from 'ol/format/WKT';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

const raster = new TileLayer({
  source: new OSM(),
});

const wkt =
'POLYGON((76869.3752264143 -23865.670589195797,317205.3070835129 -663372.484751422,-446764.2785340359 -907667.0186436959,76869.3752264143 -23865.670589195797))'

const format = new WKT();

const feature = format.readFeature(wkt);

const vector = new VectorLayer({
  source: new VectorSource({
    features: [feature],
  }),
});

const map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [2952104.0199, -3277504.823],
    zoom: 4,
  }),
});
