require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer"
], function(Map, MapView, FeatureLayer) {

    var map = new Map({
        basemap: "topo-vector"
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-71.055185, 42.3591112], // longitude, latitude
        zoom: 13
    });

    // Places feature layer
    var placesLayer = new FeatureLayer({
        // url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Places/FeatureServer/0"
    });

    map.add(placesLayer);
});
