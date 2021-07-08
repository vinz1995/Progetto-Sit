
var ImageWMS = ol.source.ImageWMS;
var Map = ol.Map;
var OSM = ol.source.OSM;
var View = ol.View;
var ImageLayer  = ol.layer.Image;
var TileLayer =ol.layer.Tile;


var MousePosition = ol.control.MousePosition;



var createStringXY = ol.coordinate.createStringXY;
var defaultControls  = ol.control.defaults;

var mousePositionControl = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: 'EPSG:4326',
  // comment the following two lines to have the mouse position
  // be placed within the map.
  className: 'custom-mouse-position',
  target: document.getElementById('mouse-position'),
  undefinedHTML: '&nbsp;',
});

var layers = [
  new TileLayer({
    controls: defaultControls().extend([mousePositionControl]),
    source: new OSM(),
  }),
  // new ImageLayer({
  //   extent: [-13884991, 2870341, -7455066, 6338219],
  //   source: new ImageWMS({
  //     url: 'http://localhost:8080/geoserver/Strade/wms',
  //     params: {'LAYERS': 'Strade:Strade'},
  //     ratio: 1,
  //     serverType: 'geoserver',
  //   }),
  // }) 
  new ImageLayer({
        source: new ImageWMS({
          ratio: 1,
          url: 'http://localhost:8080/geoserver/Strade/wms',
          params: {'VERSION': '1.1.1',  
                "STYLES": '',
                "LAYERS": 'Strade:Strade',
                "exceptions": 'application/vnd.ogc.se_inimage',
          }
        })
      })

];
var map = new Map({
  layers: layers,
  target: 'map',
  view: new View({
    center: [-10997148, 4569099],
    zoom: 4,
  }),
});

var projectionSelect = document.getElementById('projection');
projectionSelect.addEventListener('change', function (event) {
  mousePositionControl.setProjection(event.target.value);
});

var precisionInput = document.getElementById('precision');
precisionInput.addEventListener('change', function (event) {
  var format = createStringXY(event.target.valueAsNumber);
  mousePositionControl.setCoordinateFormat(format);
});

  //     var pureCoverage = false;
  //     // if this is just a coverage or a group of them, disable a few items,
  //     // and default to jpeg format
  //     var format = 'image/png';
  //     var bounds = [1725279.8899999997, 5029716.77,
  //                   1729471.25, 5034134.539999999];
  //     if (pureCoverage) {
  //       document.getElementById('antialiasSelector').disabled = true;
  //       document.getElementById('jpeg').selected = true;
  //       format = "image/jpeg";
  //     }

  //     var supportsFiltering = true;
  //     if (!supportsFiltering) {
  //       document.getElementById('filterType').disabled = true;
  //       document.getElementById('filter').disabled = true;
  //       document.getElementById('updateFilterButton').disabled = true;
  //       document.getElementById('resetFilterButton').disabled = true;
  //     }

  //     var mousePositionControl = new ol.control.MousePosition({
  //       className: 'custom-mouse-position',
  //       target: document.getElementById('location'),
  //       coordinateFormat: ol.coordinate.createStringXY(5),
  //       undefinedHTML: '&nbsp;'
  //     });
  //     var untiled = new ol.layer.Image({
  //       source: new ol.source.ImageWMS({
  //         ratio: 1,
  //         url: 'http://localhost:8080/geoserver/Strade/wms',
  //         params: {'FORMAT': format,
  //                  'VERSION': '1.1.1',  
  //               "STYLES": '',
  //               "LAYERS": 'Strade:Strade',
  //               "exceptions": 'application/vnd.ogc.se_inimage',
  //         }
  //       })
  //     });
  //     var tiled = new ol.layer.Tile({
  //       source: new TileLayer({
  //   source: new ol.source.OSM(),
  // }),
  //     });
  //     var projection = new ol.proj.Projection({
  //         code: 'EPSG:3003',
  //         units: 'm',
  //         global: false
  //     });
  //     var map = new ol.Map({
  //       controls: ol.control.defaults({
  //         attribution: false
  //       }).extend([mousePositionControl]),
  //       target: 'map',
  //       layers: [
  //         untiled,
  //         tiled
  //       ],
  //       view: new ol.View({
  //         zoom: 4,
  //         center: [-10997148, 4569099],
  //          projection: projection
  //       })
  //     });
  //     map.getView().on('change:resolution', function(evt) {
  //       var resolution = evt.target.get('resolution');
  //       var units = map.getView().getProjection().getUnits();
  //       var dpi = 25.4 / 0.28;
  //       var mpu = ol.proj.METERS_PER_UNIT[units];
  //       var scale = resolution * mpu * 39.37 * dpi;
  //       if (scale >= 9500 && scale <= 950000) {
  //         scale = Math.round(scale / 1000) + "K";
  //       } else if (scale >= 950000) {
  //         scale = Math.round(scale / 1000000) + "M";
  //       } else {
  //         scale = Math.round(scale);
  //       }
  //       document.getElementById('scale').innerHTML = "Scale = 1 : " + scale;
  //     });
  //     map.getView().fit(bounds, map.getSize());
  //     map.on('singleclick', function(evt) {
  //       document.getElementById('nodelist').innerHTML = "Loading... please wait...";
  //       var view = map.getView();
  //       var viewResolution = view.getResolution();
  //       var source = untiled.get('visible') ? untiled.getSource() : tiled.getSource();
  //       var url = source.getGetFeatureInfoUrl(
  //         evt.coordinate, viewResolution, view.getProjection(),
  //         {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50});
  //       if (url) {
  //         document.getElementById('nodelist').innerHTML = '<iframe seamless src="' + url + '"></iframe>';
  //       }
  //     });

  //     // sets the chosen WMS version
  //     function setWMSVersion(wmsVersion) {
  //       map.getLayers().forEach(function(lyr) {
  //         lyr.getSource().updateParams({'VERSION': wmsVersion});
  //       });
  //       if(wmsVersion == "1.3.0") {
  //           origin = bounds[1] + ',' + bounds[0];
  //       } else {
  //           origin = bounds[0] + ',' + bounds[1];
  //       }
  //       tiled.getSource().updateParams({'tilesOrigin': origin});
  //     }

  //     // Tiling mode, can be 'tiled' or 'untiled'
  //     function setTileMode(tilingMode) {
  //       if (tilingMode == 'tiled') {
  //         untiled.set('visible', false);
  //         tiled.set('visible', true);
  //       } else {
  //         tiled.set('visible', false);
  //         untiled.set('visible', true);
  //       }
  //     }

  //     function setAntialiasMode(mode) {
  //       map.getLayers().forEach(function(lyr) {
  //         lyr.getSource().updateParams({'FORMAT_OPTIONS': 'antialias:' + mode});
  //       });
  //     }

  //     // changes the current tile format
  //     function setImageFormat(mime) {
  //       map.getLayers().forEach(function(lyr) {
  //         lyr.getSource().updateParams({'FORMAT': mime});
  //       });
  //     }

  //     function setStyle(style){
  //       map.getLayers().forEach(function(lyr) {
  //         lyr.getSource().updateParams({'STYLES': style});
  //       });
  //     }

  //     function setWidth(size){
  //       var mapDiv = document.getElementById('map');
  //       var wrapper = document.getElementById('wrapper');

  //       if (size == "auto") {
  //         // reset back to the default value
  //         mapDiv.style.width = null;
  //         wrapper.style.width = null;
  //       }
  //       else {
  //         mapDiv.style.width = size + "px";
  //         wrapper.style.width = size + "px";
  //       }
  //       // notify OL that we changed the size of the map div
  //       map.updateSize();
  //     }

  //     function setHeight(size){
  //       var mapDiv = document.getElementById('map');
  //       if (size == "auto") {
  //         // reset back to the default value
  //         mapDiv.style.height = null;
  //       }
  //       else {
  //         mapDiv.style.height = size + "px";
  //       }
  //       // notify OL that we changed the size of the map div
  //       map.updateSize();
  //     }

  //     function updateFilter(){
  //       if (!supportsFiltering) {
  //         return;
  //       }
  //       var filterType = document.getElementById('filterType').value;
  //       var filter = document.getElementById('filter').value;
  //       // by default, reset all filters
  //       var filterParams = {
  //         'FILTER': null,
  //         'CQL_FILTER': null,
  //         'FEATUREID': null
  //       };
  //       if (filter.replace(/^\s\s*/, '').replace(/\s\s*$/, '') != "") {
  //         if (filterType == "cql") {
  //           filterParams["CQL_FILTER"] = filter;
  //         }
  //         if (filterType == "ogc") {
  //           filterParams["FILTER"] = filter;
  //         }
  //         if (filterType == "fid")
  //           filterParams["FEATUREID"] = filter;
  //         }
  //         // merge the new filter definitions
  //         map.getLayers().forEach(function(lyr) {
  //           lyr.getSource().updateParams(filterParams);
  //         });
  //       }

  //       function resetFilter() {
  //         if (!supportsFiltering) {
  //           return;
  //         }
  //         document.getElementById('filter').value = "";
  //         updateFilter();
  //       }

  //       // shows/hide the control panel
  //       function toggleControlPanel(){
  //         var toolbar = document.getElementById("toolbar");
  //         if (toolbar.style.display == "none") {
  //           toolbar.style.display = "block";
  //         }
  //         else {
  //           toolbar.style.display = "none";
  //         }
  //         map.updateSize()
  //       }

