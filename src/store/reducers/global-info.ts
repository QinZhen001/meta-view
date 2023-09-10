import { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng"
import { Position, RenderType, UserPayload } from "../../types";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Direction } from "../../types"
import { getInitPosition, getRandomUid } from "../../utils/utils"
import { DEFAULT_WORLD_ID, DEFAULT_RENDER_TYPE } from "../../utils/constant"
import { getFromLocal, saveToLocal, STORAGE_REMOVE_USERS, STORAGE_INFO } from "../../utils/storage"

interface InitialState {
  position: Position // 当前人位置
  direction: Direction // 方向,
  info: {
    uid: number, // 用户id
    worldId: string // 世界id
    renderType: RenderType // 渲染类型
  }
  remoteUserPayloads: {
    [uid: string]: UserPayload
  }, // 远端用户位置
  pageInfo: {
    width: number,
    height: number
  },
}

const getInitialState = () => {
  const users = getFromLocal(STORAGE_REMOVE_USERS) || {}
  const info = getFromLocal(STORAGE_INFO) || {}


  return {
    info: {
      uid: info.uid || getRandomUid(),
      worldId: info.worldId || DEFAULT_WORLD_ID,
      renderType: info.renderType || DEFAULT_RENDER_TYPE,
    },
    position: getInitPosition(),
    direction: "down",
    remoteUserPayloads: users,
    pageInfo: {
      width: 0,
      height: 0
    },
  } as InitialState
}

export const infoSlice = createSlice({
  name: 'globalInfo',
  initialState: getInitialState(),
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload
    },
    setPosition: (state, action) => {
      state.position = action.payload
    },
    setPageInfo: (state, action) => {
      state.pageInfo = action.payload
    },
    setRemoteUserPayloads: (state, action: PayloadAction<UserPayload | null>) => {
      const payload = action.payload
      if (payload) {
        const { uid, position } = payload
        if (position) {
          // set one 
          state.remoteUserPayloads[uid] = payload
        } else {
          // delete one 
          delete state.remoteUserPayloads[uid]
        }
        saveToLocal(STORAGE_REMOVE_USERS, state.remoteUserPayloads)
      }
    },
    setDirection: (state, action: PayloadAction<Direction>) => {
      state.direction = action.payload
    },
    reset(state) {
      Object.assign(state, getInitialState())
    }
  },
});

export const {
  setPosition, setPageInfo,
  setRemoteUserPayloads, setDirection, setInfo, reset
} = infoSlice.actions;

export default infoSlice.reducer;
