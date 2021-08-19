import {Fill, Stroke, Style, Text} from "ol/style";
import VectorLayer from "ol/layer/Vector";
import {mapOptions, sourceOptions, styleOptions, vectorLayerOptions} from "./openlayer_ext_interfaces";
import {Map, View} from "ol";
import {fromLonLat} from "ol/proj";
import {defaults} from "ol/interaction";
import VectorSource from "ol/source/Vector";

/**
 * 创建样式
 * @type {Style}
 */
export function createStyle(option: styleOptions) {
    return new Style({
        fill: new Fill({
            color: option.fillColor,
        }),
        stroke: new Stroke({
            color: option.strokeColor,
            width: 1,
        }),
        text: new Text({
            font: option.textFont,
            fill: new Fill({
                color: option.textColor,
            }),
            stroke: new Stroke({
                color: '#fff',
                width: 3,
            }),
        }),
    });
}

/**
 * 创建source
 * @param options
 */
export function createSource(options: sourceOptions) {
    return new VectorSource({
        features: options.features,
    })
}

/**
 * 创建V图层
 * @param source
 * @param option
 */
export function createVectorLayer(source: vectorLayerOptions, option: styleOptions) {
    return new VectorLayer({
        source: source.vectorSource,
        style: function (feature) {
            let styleObj = createStyle(option)
            styleObj.getText().setText(feature.get('name'));
            return styleObj;
        },
    });
}

/**
 * 创建地图
 * @param option
 */
export function createMap(option: mapOptions) {
    return new Map({
        target: option.target,
        layers: option.layers,
        view: new View({
            center: fromLonLat(option.coordinate ? option.coordinate : [104.0991993310, 30.38086606300002]),
            zoom: 10.3,
        }),
        controls: [],
        interactions: defaults({
            doubleClickZoom: false,
            mouseWheelZoom: false,
            shiftDragZoom: false,
            dragPan: false
        })
    });
}

/**
 * 清楚地图内容
 * @param map
 */
export function destroyMap(map: any): void {
    if (!map) return;

    let host = map.getTargetElement();
    if (host) {
        host.innerHTML = '';
    }
    map = null;
}