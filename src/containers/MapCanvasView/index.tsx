import { useMap, useScreenResize, useDirectionKeydown } from "../../utils/hooks"
import { useEffect, useLayoutEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { Renderer } from "./render"
import { RootState } from "../../store"
import "./index.scss"

let renderer: Renderer | null = null



// render with canvas (pixi.js in webgl) 
const MapDomView = () => {
  useScreenResize()
  useDirectionKeydown()
  const { bgPositionX, bgPositionY, mapWidth, mapHeight, scale } = useMap()
  const position = useSelector((state: RootState) => state.globalInfo.position);
  const remoteUserPayloads = useSelector((state: RootState) => state.globalInfo.remoteUserPayloads);
  const direction = useSelector((state: RootState) => state.globalInfo.direction);
  const { uid } = useSelector((state: RootState) => state.globalInfo.info);

  const mapRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    renderer = new Renderer({
      node: mapRef.current!,
      width: mapWidth,
      height: mapHeight,
    })
    // @ts-ignore
    window.renderer = renderer
    renderer.drawBG()

    return () => {
      renderer?.destory()
      renderer = null
    }
  }, [])

  useEffect(() => {
    if (renderer) {
      console.log("[mate] resize", mapWidth, mapHeight, scale)
      renderer.resize(mapWidth, mapHeight, scale)
    }
  }, [mapWidth, mapHeight, renderer, scale])

  useEffect(() => {
    if (renderer) {
      renderer.drawMe({
        uid,
        position,
        direction,
      })
    }
  }, [uid, direction, position])


  useEffect(() => {
    if (renderer) {
      renderer.drawRemoteUsers(remoteUserPayloads)
    }
  }, [remoteUserPayloads])

  return <div className="map-view">
    <div className="map-content" ref={mapRef} style={{
      width: `${mapWidth}px`,
      height: `${mapHeight}px`,
      backgroundPosition: `${bgPositionX}px ${bgPositionY}px`,
    }}></div>
  </div>
}

export default MapDomView
