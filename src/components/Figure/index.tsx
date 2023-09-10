import { useRef, useMemo } from "react"
import { Direction } from "../../types"
import { useMap } from "../../utils/hooks"
import { DEFAULT_FIGURE_WIDTH, DEFAULT_NAME_HEIGHT, DEFAULT_AVATAR_WIDTH, DEFAULT_AVATAR_HEIGHT } from "../../utils/constant"
import avatarUp from "./assets/avatar_up.png"
import avatarDown from "./assets/avatar_down.png"
import avatarLeft from "./assets/avatar_left.png"
import avatarRight from "./assets/avatar_right.png"
import "./index.scss"

interface FigureProps {
  uid?: string | number,
  x?: number,
  y?: number,
  r1?: number,
  r2?: number,
  direction?: Direction
  isMe?: boolean
  style?: React.CSSProperties
}



const Figure = ({ uid, x = 0, y = 0, r1 = 0, r2 = 0, style, direction, isMe = false }: FigureProps) => {
  const figureRef = useRef<HTMLElement>(null)
  const { scale, bgPositionX, bgPositionY } = useMap()

  const avatarSrc = useMemo(() => {
    switch (direction) {
      case "down":
        return avatarDown
      case "up":
        return avatarUp
      case "left":
        return avatarLeft
      case "right":
        return avatarRight
      default:
        return avatarDown
    }
  }, [direction])

  const nameInfo = useMemo(() => {
    return {
      width: (DEFAULT_FIGURE_WIDTH * scale),
      height: (DEFAULT_NAME_HEIGHT * scale),
      lineHeight: (DEFAULT_NAME_HEIGHT * scale),
    }
  }, [scale])

  const circleInfo = useMemo(() => {
    return {
      r1Len: r1 * 2 * scale,
      r2Len: r2 * 2 * scale
    }
  }, [r1, r2, scale])

  const avatarInfo = useMemo(() => {
    return {
      width: DEFAULT_AVATAR_WIDTH * scale,
      height: DEFAULT_AVATAR_HEIGHT * scale
    }
  }, [scale])


  const finStyle = useMemo(() => {
    let transformX = x * scale - nameInfo.width / 2+ bgPositionX
    let transformY = y * scale - nameInfo.height - (avatarInfo.height / 2) + bgPositionY
    return {
      ...style,
      transform: `translate(${transformX}px, ${transformY}px)`,
    }
  }, [style, scale, nameInfo, avatarInfo, bgPositionX, bgPositionY])

  return <section className="figure" style={finStyle} ref={figureRef}>
    {uid ? <div
      className="name"
      style={{
        height: nameInfo.height + "px",
        lineHeight: nameInfo.lineHeight + "px",
        width: nameInfo.width + "px"
      }}>{uid}</div> : null}
    <img src={avatarSrc} style={{
      width: avatarInfo.width + "px",
      height: avatarInfo.height + "px"
    }}></img>
    {circleInfo.r2Len ? <div className="r2" style={{ width: circleInfo.r2Len + "px", height: circleInfo.r2Len + "px" }}></div> : null}
    {circleInfo.r1Len ? <div className="r1" style={{ width: circleInfo.r1Len + "px", height: circleInfo.r1Len + "px" }}></div> : null}
  </section>
}

export default Figure 
