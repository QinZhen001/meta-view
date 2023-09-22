import { useMap, useScreenResize, useDirectionKeydown } from "../../utils/hooks"
import { useEffect, useLayoutEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { Renderer, IPersonDrawOptions } from "./render"
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
  const { uid = "" } = useSelector((state: RootState) => state.globalInfo.info);
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
      console.log("[meta] resize", mapWidth, mapHeight, scale, bgPositionX, bgPositionY)
      renderer.resize({
        width: mapWidth,
        height: mapHeight,
        offsetX: bgPositionX,
        offsetY: bgPositionY,
        scale,
      })
    }
  }, [mapWidth, mapHeight, scale, bgPositionX, bgPositionY])




  useEffect(() => {
    if (renderer ) {
      console.log("[meta] drawMe", uid, position, direction)
      renderer.drawMe({
        uid: uid.toString(),
        position,
        direction,
        offsetX: bgPositionX,
        offsetY: bgPositionY,
      })
    }
  }, [uid, direction, position, bgPositionX, bgPositionY])


  useEffect(() => {
    if (renderer) {
      renderer.drawRemoteUsers(remoteUserPayloads as {
        [uid: string]: IPersonDrawOptions
      })
    }
  }, [remoteUserPayloads])

  return <div className="map-view">
    <div className="map-content" ref={mapRef} style={{
      width: `${mapWidth}px`,
      height: `${mapHeight}px`,
    }}></div>
  </div>
}

export default MapDomView
