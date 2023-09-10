import { useEffect, useMemo, useRef, useState } from "react";
import MapDomView from "../../containers/MapDomView";
import { usePositionClient, useStore } from "../../utils/hooks"
import {deleteLocalALL} from "../../utils/storage"
import "./index.scss"

const MainPage = () => {
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
    <MapDomView></MapDomView>
  </div>

}

export default MainPage;
