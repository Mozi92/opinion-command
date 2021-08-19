import source from "ol/source/Vector";
import {Geometry} from "ol/geom";
import BaseLayer from "ol/layer/Base";
import {Coordinate} from "ol/coordinate";
import {Feature} from "ol";
import {Style} from "ol/style";
import RenderFeature from "ol/render/Feature";

/**
 * 样式参数
 */
export interface styleOptions {
    fillColor: string | number[],
    strokeColor: string | number[],
    textFont: string,
    textColor: string | number[],
}

/**
 * 源参数
 */
export interface sourceOptions {
    features: Feature<any>[] | []
}

/**
 * V图层参数
 */
export interface vectorLayerOptions {
    vectorSource: source<Geometry>
}

/**
 * 地图实例参数
 */
export interface mapOptions {
    target: string,
    layers: BaseLayer[] | [],
    coordinate?: Coordinate | []
}

/**
 * 矢量图层样式函数
 */
export interface styleFuc {
    (feature: Feature<any>): Style | Style[] | ((arg0: Feature<any> | RenderFeature, arg1: number) => void | Style | Style[]) | undefined
}