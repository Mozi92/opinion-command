import {OSM} from "ol/source";
import TileLayer from "ol/layer/Tile";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {styleFuc} from "./openlayer_ext_interfaces";
import {Fill, Icon, Stroke, Style} from "ol/style";
import {LineString, Point} from "ol/geom";
import {Feature} from "ol";
import {Coordinate} from "ol/coordinate";
import CircleStyle from "ol/style/Circle";

export const styles = {
    'route': new Style({
        stroke: new Stroke({
            width: 6,
            color: [237, 212, 0, 0.8],
        }),
    }),
    'icon': new Style({
        image: new Icon({
            anchor: [0.5, 1],
            src: 'pos/icon.png',
        }),
    }),
    'geoMarker': new Style({
        image: new CircleStyle({
            radius: 7,
            fill: new Fill({color: 'black'}),
            stroke: new Stroke({
                color: 'white',
                width: 2,
            }),
        }),
    }),
};

/**
 * 监听鼠标点击 连线
 */
let styleFunction: styleFuc
styleFunction = function (feature: Feature<any>) {
    const geometry = feature.getGeometry();
    console.log(geometry.getCoordinates())
    const styles = [
        // linestring
        new Style({
            stroke: new Stroke({
                color: '#ee1616',
                width: 2,
            }),
        }),
    ];

    geometry.forEachSegment(function (start: any, end: any) {
        const dx = end[0] - start[0];
        const dy = end[1] - start[1];
        const rotation = Math.atan2(dy, dx);
        // arrows
        styles.push(
            new Style({
                geometry: new Point(end),
                image: new Icon({
                    src: 'data/arrow.png',
                    anchor: [0.75, 0.5],
                    rotateWithView: true,
                    rotation: -rotation,
                }),
            })
        );
    });

    return styles;
}

/**
 * openLayer默认图层
 */
export function raster() {
    return new TileLayer({
        source: new OSM(),
    });
}

/**
 * 矢量图层
 */
export function defVectorLayer() {
    return new VectorLayer({
        source: new VectorSource(),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        style: styleFunction,
    });
}

/**
 * 线数据
 */
export function lineFeature(coordinates: Array<Coordinate> | Array<number>): Feature<any> {
    return new Feature({
        type: 'route',
        geometry: new LineString(coordinates)
    })
}

/**
 * 线层
 */
export function lineLayer(features: Feature<any>[] | Array<Feature<any>>): VectorLayer<any> {
    return new VectorLayer({
        source: new VectorSource({
            features: features
        }),
        style: function (feature) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return styles[feature.get('type')];
        }
    })
}

/**
 * 创建标注
 * @param coordinates
 * @param type
 */
export function createMark(coordinates: number[], type?: string): Feature<any> {
    return new Feature({
        type: type ? type : 'icon',
        geometry: new Point(coordinates),
    });
}