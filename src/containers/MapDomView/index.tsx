import FigureView from "../FigureView"
import { useMap, useScreenResize, useDirectionKeydown } from "../../utils/hooks"
import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import "./index.scss"

// render with dom node 
const MapDomView = () => {
  useScreenResize()
  useDirectionKeydown()
  const { bgPositionX, bgPositionY, mapWidth, mapHeight } = useMap()

  return <div className="map-view">
    <div className="map-content" style={{
      width: `${mapWidth}px`,
      height: `${mapHeight}px`,
      backgroundPosition: `${bgPositionX}px ${bgPositionY}px`,
    }}>
      <FigureView></FigureView>
      {/* <RoomMockView></RoomMockView> */}
    </div>

  </div>
}

export default MapDomView
