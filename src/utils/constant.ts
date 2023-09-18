import {RenderType} from "../types/index"

export const DEFAULT_DISTANCE = 15 // 10px 每次移动
export const TEAM_ID1 = "team1"  // team1 id
export const TEAM_ID2 = "team2"  // team2 id
export const DEFAULT_WORLD_ID = "default_world67" // world id
export const DEFAULT_RENDER_TYPE = RenderType.Canvas
export const PAGE_RATIO = 1.777778 // page ratio
export const PAGE_MIN_WIDTH = 1440 // page min width 1440
export const PAGE_MIN_HEIGHT = Math.floor(PAGE_MIN_WIDTH / PAGE_RATIO) // page min height
export const PAGE_MAX_WIDTH = PAGE_MIN_WIDTH * 2 // page max width
export const PAGE_MAX_HEIGHT = Math.floor(PAGE_MAX_WIDTH / PAGE_RATIO) // page max height
export const ICON_SIZE = "26px"
export const DEFAULT_FIGURE_WIDTH = 60  // figure 的宽度
// figure 高度 =  DEFAULT_NAME_HEIGHT +  DEFAULT_AVATAR_HEIGHT
export const DEFAULT_NAME_HEIGHT = 16 // figure 中text的高度
export const DEFAULT_NAME_WIDTH = DEFAULT_FIGURE_WIDTH
export const DEFAULT_AVATAR_WIDTH = 40 // figure 中小人的宽度
export const DEFAULT_AVATAR_HEIGHT = 44// figure 中小人的高度
