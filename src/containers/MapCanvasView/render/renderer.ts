import * as PIXI from 'pixi.js';
import { Person } from './person';
import { IRenderOptions, IPersonOptions, IPersonDrawOptions, InOutEvents, EventHandler } from "./types"
import { loadTextures } from "./utils"
import mitt from 'mitt'



interface IResizeOptions extends IDrawBGOptions {
  width: number,
  height: number,
  scale?: number,
}

interface IDrawBGOptions {
  offsetX?: number,
  offsetY?: number
}

// TODO:
// status renderer 状态改变
// 对外api根据状态判断

export class Renderer {
  options: IRenderOptions
  // TODO: remoteUsers
  remoteUsers: Map<string, Person> = new Map()
  mePerson?: Person
  BgSprite?: PIXI.Sprite
  app: PIXI.Application
  // 只控制内部元素的缩放 => canvas本身的缩放由resize控制了
  scale: number = 1


  private _emitter = mitt<InOutEvents>()

  constructor(options: IRenderOptions) {
    this.options = options;
    const { node, width, height } = this.options
    this.app = new PIXI.Application({
      background: '#303032',
      width: width,
      height: height,
      // resizeTo: window,
      antialias: true,
    });
    // @ts-ignore
    node.appendChild(this.app.view);
  }

  get hasMe() {
    return !!this.mePerson
  }

  // -------------- public methods --------------

  resize({
    width,
    height,
    scale,
    offsetX,
    offsetY
  }: IResizeOptions) {
    this.scale = scale || this.scale
    // canvas的宽高
    this.app.view.width = width
    this.app.view.height = height
    // 渲染器的宽高
    this.app.screen.width = width
    this.app.screen.height = height
    this.drawBG({
      offsetX,
      offsetY
    })
    this.drawMe()
  }

  drawBG({
    offsetX = 0,
    offsetY = 0
  }: IDrawBGOptions = {}) {
    if (!this.BgSprite) {
      const texture = PIXI.Texture.from('./map.jpeg');
      this.BgSprite = new PIXI.Sprite(texture)
      this.app.stage.addChild(this.BgSprite);;
    }
    this.BgSprite.position.set(0, 0);
    this.BgSprite.width = this.app.view.width;
    this.BgSprite.height = this.app.view.height;
    this.BgSprite.x = offsetX
    this.BgSprite.y = offsetY
    console.log("[meta] drawBG", offsetX, offsetY)
  }



  drawMe(o: IPersonDrawOptions = {}) {
    const { uid = "", position, direction } = o
    if (!this.hasMe) {
      this.mePerson = new Person({
        isMe: true,
        app: this.app
      })
    }
    this?.mePerson?.draw({
      uid,
      position,
      direction,
      scale: this.scale
    })
  }


  drawRemoteUsers(remoteUsers: {
    [uid: string]: IPersonDrawOptions
  }) {
    if (!this.remoteUsers.size) {
      Object.keys(remoteUsers).forEach(uid => {
        const person = new Person({
          isMe: false,
          app: this.app
        })
        this.remoteUsers.set(uid, person)
        person.draw(remoteUsers[uid])
      })
    } else {

    }
  }

  on<Key extends keyof InOutEvents>(type: Key, handler: EventHandler<InOutEvents[Key]>) {
    return this._emitter.on(type, handler)
  }

  emit<Key extends keyof InOutEvents>(event: Key, data: InOutEvents[Key]) {
    return this._emitter.emit(event, data)
  }

  destory() {
    this.app.destroy()
  }

  // -------------- private methods --------------



  _createPerson(options: IPersonOptions) {
    if (options.isMe) {
      // 
    } else {

    }
  }



}

