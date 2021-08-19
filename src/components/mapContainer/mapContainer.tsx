import React, {useEffect, useState} from "react";
import {createMap, destroyMap} from "../../utils/openlayer_ext_functions";
import {Map} from "ol";
import {createMark, defVectorLayer, lineFeature, lineLayer, raster, styles} from "../../utils/localSource";
import lines from "../../local/lines";
import {getVectorContext} from "ol/render";

function MapContainer() {
    let map: Map, distance: number = 0, lastTime: number = 0
    const [lay, setLay] = useState(raster())
    const [vec, setVec] = useState(defVectorLayer())
    const [route, setRoute] = useState(lineFeature(lines))
    const [begin, setBegin] = useState(createMark(route.getGeometry().getFirstCoordinate()))
    const [end, setEnd] = useState(createMark(route.getGeometry().getLastCoordinate()))
    const [geo, setGeo] = useState(createMark(route.getGeometry().getLastCoordinate(), 'geoMarker'))
    const [line, setLine] = useState(lineLayer([route, begin, end, geo]))

    function moveFeature(event: any) {
        const speed = Number(20);
        const time = event.frameState.time;
        const elapsedTime = time - lastTime;
        distance = (distance + (speed * elapsedTime) / 1e6) % 2;
        lastTime = time
        const currentCoordinate = route.getGeometry().getCoordinateAt(
            distance > 1 ? 2 - distance : distance
        );
        geo.getGeometry().setCoordinates(currentCoordinate);
        const vectorContext = getVectorContext(event);
        vectorContext.setStyle(styles.geoMarker);
        vectorContext.drawGeometry(geo.getGeometry());
        map.render();
    }

    useEffect(() => {
        map = createMap({
            target: 'map',
            layers: [lay, vec, line]
        })
        line.on('postrender', moveFeature);
        return () => {
            line.un('postrender', moveFeature);
            destroyMap(map)
        }
    }, [])
    return (<div id='map' className='map filling'></div>)
}

export default MapContainer