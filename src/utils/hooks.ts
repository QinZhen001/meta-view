import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { setPageInfo, setPosition } from "../store/reducers/global-info"
import { useDispatch, useSelector } from 'react-redux';
import { message } from "antd"
import PositionClient from "../utils/pos-rtc"
import { RootState } from "../store";
import { Direction, Position, IShape, InOutState, IArea } from "../types"
import {
  generateToken, getForwardDirection,
  getRightDirection
} from "./utils"
import {
  DEFAULT_DISTANCE, TEAM_ID1, TEAM_ID2,
  PAGE_RATIO, PAGE_MIN_WIDTH,
  PAGE_MIN_HEIGHT, PAGE_MAX_WIDTH, PAGE_MAX_HEIGHT
} from "./constant"
import { setDirection, reset as resetGlobalInfo } from "../store/reducers/global-info"



let positionClient: PositionClient | null = null


const useTeam = () => {

  const joinTeam = (teamId: string) => {
    message.success(`join team success! teamId: ${teamId}`)
  }

  const leaveTeam = (teamId: string) => {
    message.success(`leave team success! teamId: ${teamId}`)
  }

  return {
    joinTeam,
    leaveTeam
  }
}


export const useDirectionKeydown = () => {
  const dispatch = useDispatch()
  const position = useSelector((state: RootState) => state.globalInfo.position)
  const direction = useSelector((state: RootState) => state.globalInfo.direction)
  const { joinTeam, leaveTeam } = useTeam()
  const { scale, mapWidth, mapHeight, bgPositionX, bgPositionY } = useMap()
  const room1 = useRoom1Rect()
  const room2 = useRoom2Rect()
  const lock = useRef(false)
  const area = useRef<IArea>("world")

  const isInMap = useCallback((p: Position) => {
    let [x, y, z] = p
    x = x
    y = y
    const offset = 5
    if (x <= 0 + offset || x >= mapWidth - offset || y <= 0 + offset || y >= mapHeight - offset) {
      return false
    }

    return true
  }, [mapWidth, mapHeight, scale])

  const isInRoom1 = useCallback((p: Position) => {
    let [x, y, z] = p
    x = x * scale + bgPositionX
    y = y * scale + bgPositionY
    const { x: shapeX, y: shapeY, width, height } = room1
    return x >= shapeX && x <= shapeX + width && y >= shapeY && y <= shapeY + height
  }, [room1, scale, bgPositionX, bgPositionY])

  const isInRoom2 = useCallback((p: Position) => {
    let [x, y, z] = p
    x = x * scale + bgPositionX
    y = y * scale + bgPositionY
    const { x: shapeX, y: shapeY, width, height } = room2
    return x >= shapeX && x <= shapeX + width && y >= shapeY && y <= shapeY + height
  }, [room2, scale, bgPositionX, bgPositionY])

  const dealInOutRoom = async (p: Position): Promise<InOutState | null> => {
    if (area.current == "world") {
      if (isInRoom1(p)) {
        area.current = "room1"
        return InOutState.JoinRoom1
      } else if (isInRoom2(p)) {
        area.current = "room2"
        return InOutState.JoinRoom2
      }
    } else if (area.current == "room1") {
      if (!isInRoom1(p)) {
        area.current = "world"
        return InOutState.LeaveRoom1
      }
    } else if (area.current == "room2") {
      if (!isInRoom2(p)) {
        area.current = "world"
        return InOutState.LeaveRoom2
      }
    }

    return null
  }

  const dealInOutTeam = async (state: InOutState) => {
    switch (state) {
      case InOutState.JoinRoom1:
        await joinTeam(TEAM_ID1)
        break
      case InOutState.JoinRoom2:
        await joinTeam(TEAM_ID2)
        break
      case InOutState.LeaveRoom1:
        await leaveTeam(TEAM_ID1)
        break
      case InOutState.LeaveRoom2:
        await leaveTeam(TEAM_ID2)
        break
    }
  }

  const onKeydown = async (event: KeyboardEvent) => {
    let newPosition: Position = [position[0], position[1], position[2]]
    let newDirection: Direction = "down"
    if (event.key === "ArrowUp" || event.key === "w") {
      // 上键
      newPosition[1] = position[1] - DEFAULT_DISTANCE
      newDirection = "up"
    } else if (event.key === "ArrowDown" || event.key === "s") {
      // 下键
      newPosition[1] = position[1] + DEFAULT_DISTANCE
      newDirection = "down"
    } else if (event.key === "ArrowLeft" || event.key === "a") {
      // 左键
      newPosition[0] = position[0] - DEFAULT_DISTANCE
      newDirection = "left"
    } else if (event.key === "ArrowRight" || event.key === "d") {
      // 右键
      newPosition[0] = position[0] + DEFAULT_DISTANCE
      newDirection = "right"
    } else {
      return
    }

    if (lock.current) {
      return
    }
    lock.current = true
    // 在地图内
    if (isInMap(newPosition)) {
      const state = await dealInOutRoom(newPosition)
      if (direction !== newDirection) {
        dispatch(setDirection(newDirection))
      }
      dispatch(setPosition(newPosition))
      if (state) {
        await dealInOutTeam(state)
      }
    } else {
      if (direction !== newDirection) {
        dispatch(setDirection(newDirection))
      }
    }
    lock.current = false
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("keydown", onKeydown);
    }
  }, [position, room1, room2, scale, direction])

}

export const useScreenResize = () => {
  const dispatch = useDispatch();

  const onResize = () => {
    dispatch(setPageInfo({
      width: window.innerWidth,
      height: window.innerHeight
    }))
  }

  useEffect(() => {
    onResize()
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    }
  }, [])
}
// team 


export const usePositionClient = () => {
  // const dispatch = useDispatch()
  const position = useSelector((state: RootState) => state.globalInfo.position)
  const direction = useSelector((state: RootState) => state.globalInfo.direction)
  const info = useSelector((state: RootState) => state.globalInfo.info)
  const { worldId, uid } = info
  const { scale } = useMap()

  useEffect(() => {
    positionClient?.updatePosition(position, direction)
  }, [position, direction, scale])


  const initPositionClient = async () => {
    if (positionClient) {
      return
    }
    const channel = worldId + "_position"
    const token = await generateToken(uid, channel)
    positionClient = new PositionClient({
      uid,
      channel,
    })
  }

  const joinPositionClient = async () => {
    if (!positionClient) {
      throw new Error("positionClient is null")
    }
    await positionClient.join()
    await positionClient.updatePosition(position, direction)
  }

  const destoryPositionClient = async () => {
    await positionClient?.leave()
    positionClient = null
  }


  return {
    initPositionClient,
    joinPositionClient,
    destoryPositionClient
  }
}



export const useStore = () => {
  const dispatch = useDispatch();

  const resetStore = () => {
    dispatch(resetGlobalInfo())
  }

  return {
    resetStore
  }
}



export const useRoom1Rect = (): IShape => {
  const { scale, bgPositionX, bgPositionY } = useMap()
  let x = Math.floor(476 * scale) + bgPositionX
  let y = Math.floor(30 * scale) + bgPositionY
  let roomWidth = Math.floor(456 * scale)
  let roomHeight = Math.floor(272 * scale)

  return {
    x: x,
    y: y,
    width: roomWidth,
    height: roomHeight
  }
}


export const useRoom2Rect = (): IShape => {
  const { scale, bgPositionX, bgPositionY } = useMap()
  let x = Math.floor(960 * scale) + bgPositionX
  let y = Math.floor(30 * scale) + bgPositionY
  let roomWidth = Math.floor(450 * scale)
  let roomHeight = Math.floor(270 * scale)

  return {
    x: x,
    y: y,
    width: roomWidth,
    height: roomHeight
  }
}

export const useMap = () => {
  const { width: pageWidth, height: pageHeight } = useSelector((state: RootState) => state.globalInfo.pageInfo);
  const position = useSelector((state: RootState) => state.globalInfo.position)

  let mapWidth = 0
  let mapHeight = 0
  let scale = 1 // 和 min width/height 的比例

  if (pageWidth / pageHeight >= PAGE_RATIO) {
    mapWidth = pageHeight * PAGE_RATIO;
    mapHeight = pageHeight;
    scale = pageHeight / PAGE_MIN_HEIGHT
  } else {
    mapWidth = pageWidth;
    mapHeight = pageWidth / PAGE_RATIO;
    scale = pageWidth / PAGE_MIN_WIDTH
  }

  if (mapWidth < PAGE_MIN_WIDTH || mapHeight < PAGE_MIN_HEIGHT) {
    mapWidth = PAGE_MIN_WIDTH
    mapHeight = PAGE_MIN_HEIGHT
    scale = 1
  } else if (mapWidth > PAGE_MAX_WIDTH || mapHeight > PAGE_MAX_HEIGHT) {
    mapWidth = PAGE_MAX_WIDTH
    mapHeight = PAGE_MAX_HEIGHT
    scale = mapWidth / PAGE_MIN_WIDTH
  }

  mapWidth = Math.floor(mapWidth)
  mapHeight = Math.floor(mapHeight)

  let [x, y] = position
  // bgPositionX/bgPositionY 均需要负值
  let bgPositionX = 0
  let bgPositionY = 0
  if (pageHeight && mapHeight) {
    // 当地图的宽 > 页面宽时 需要背景移动 
    if (pageWidth < mapWidth) {
      let centerX = pageWidth / 2 // 到达 centerX 时背景开始移动
      let max = -(mapWidth - pageWidth) // 负值
      if (x > centerX) {
        bgPositionX = centerX - x // 负值
        bgPositionX = bgPositionX <= max ? max : bgPositionX
      }
    }
    // 当地图的高 > 页面高时 需要背景移动 
    if (pageHeight < mapHeight) {
      let centerY = pageHeight / 2 // 到达 centerY 时背景开始移动
      let max = -(mapHeight - pageHeight) / 2 // 负值
      bgPositionY = -max
      if (y > centerY) {
        const dis = centerY - y// 负值
        bgPositionY = bgPositionY + dis
        bgPositionY = bgPositionY <= max ? max : bgPositionY
      }
    }
  }


  return {
    pageWidth: pageWidth,
    pageHeight: pageWidth,
    mapWidth: mapWidth,
    mapHeight: mapHeight,
    bgPositionX, // 负值
    bgPositionY, // 负值
    scale: Number(scale.toFixed(4))
  }

}


