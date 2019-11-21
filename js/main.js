require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Editor"
], function(Map, MapView, FeatureLayer, Editor) {

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
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Places/FeatureServer/0"
    });

    // places with reviews layer
    var combinedLayer = new MapImageLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Places/FeatureServer/0",
        title: "Places and reviews",
        sublayers: [
            {
                title: "Places with reviews",
                id: 0,
                source: {
                    type: "data-layer",
                    dataSource: {
                        type: "join-table",
                        leftTableSource: {
                            type: "map-layer",
                            url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Places/FeatureServer/0"
                            // mapLayerId: 0
                        },
                        rightTableSource: {
                            type: "data-layer",
                            dataSource: {
                                type: "table",
                                url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/reviews_csv/FeatureServer/0"
                            }
                        },
                        leftTableKey: "OBJECTID",
                        rightTableKey: "place_id",
                        joinType: "left-outer-join"
                    }
                }
            }
        ]
    });

    map.add(combinedLayer);

    view.when(function(){

        // editor
        var editor = new Editor({
            layer: placesLayer,
            view: view
        });

        view.ui.add(editor, "top-right");
    });
});
