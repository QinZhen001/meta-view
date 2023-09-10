import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng"
import { Direction, Position, UserPayload } from "../types"
import { uint8ArrayToString, stringToUint8Array } from "./utils"
import store from "../store"
import { setRemoteUserPayloads } from "../store/reducers/global-info"

interface PositionClientConfig {
  uid?: number
  appId?: string
  token?: string
  channel: string
}

const genMsg = (data: any) => {
  // console.log("stream-message send", data)
  return stringToUint8Array(JSON.stringify(data))
}

export default class PositionClient {
  client: IAgoraRTCClient
  config: PositionClientConfig
  position?: Position
  // ----------------  private  ---------------- 
  _joined: boolean = false  // 是否加入频道

  constructor(config: PositionClientConfig) {
    this.config = config
    this.client = AgoraRTC.createClient({
      mode: "live",
      codec: "vp8"
    });
    this.client.setClientRole("host")
    this._handleEvents()
  }


  // --------------------  public methods --------------------

  async join() {
    let { uid = null, channel, token = null, appId = "" } = this.config
    if (!appId) {
      appId = import.meta.env.VITE_AGORA_APP_ID
    }
    if (!token) {
      // TODO: 生成token`
      // gen token
    }
    await this.client.join(appId, channel, token, uid)
    this._joined = true
  }

  async leave() {
    await this.client.leave()
    this._joined = false
  }

  async updatePosition(position: Position, direction: Direction = "down") {
    if (this._joined) {
      this.position = position
      this._sendStreamMessage({
        type: "position",
        payload: {
          uid: this.config.uid,
          position,
          direction,
        } as UserPayload
      })
    }
  }


  // --------------------  private methods --------------------

  private _sendStreamMessage(msg = {}) {
    // @ts-ignore
    this.client.sendStreamMessage(genMsg(msg))
  }

  private _handleEvents() {
    this.client.on("stream-message", (id: string, data: any) => {
      data = JSON.parse(uint8ArrayToString(data))
      const { type, payload } = data
      if (type == 'position') {
        // console.log("stream-message get", payload)
        store.dispatch(setRemoteUserPayloads(payload))
      }
    })
    // remote user left => delete user
    this.client.on("user-left", (user) => {
      const uid = user.uid
      const payload: UserPayload = {
        uid,
      }
      store.dispatch(setRemoteUserPayloads(payload))
    })
    // remote user joined => updatePosition
    this.client.on("user-joined", (user) => {
      if (this.position) {
        this.updatePosition(this.position)
      }
    })
  }
}
