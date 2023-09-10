import { useEffect, useMemo, useRef, useState } from "react";
import MapDomView from "../../containers/MapDomView";
import MapCanvasView from "../../containers/MapCanvasView";
import { RootState } from "../../store"
import { usePositionClient, useStore } from "../../utils/hooks"
import { deleteLocalALL } from "../../utils/storage"
import { useSelector } from "react-redux";
import { RenderType } from "../../types";
import "./index.scss"

const MainPage = () => {
  const { renderType } = useSelector((state: RootState) => state.globalInfo.info);
  const { initPositionClient, joinPositionClient, destoryPositionClient } = usePositionClient()
  const { resetStore } = useStore()


  useEffect(() => {
    init()
    return () => {
      destory()
    }
  }, [])


  const init = async () => {
    await initPosition()
  }

  const destory = async () => {
    destoryPositionClient()
    deleteLocalALL()
    resetStore()
  }

  const initPosition = async () => {
    await initPositionClient()
    await joinPositionClient()
  }


  return <div className="main-page">
    {renderType == RenderType.Dom ? <MapDomView></MapDomView> : <MapCanvasView></MapCanvasView>}
  </div>

}

export default MainPage;
