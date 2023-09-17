import * as PIXI from 'pixi.js';
import { Person } from './person';
import { IRenderOptions, IPersonOptions, IPersonUpdateOptions, RemoteUserPayloads, InOutEvents, EventHandler } from "./types"
import mitt from 'mitt'


// TODO:
// status renderer 状态改变
// 对外api根据状态判断

export class Renderer {
  options: IRenderOptions
  othersPerson: Map<string, Person> = new Map()
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



  resize(width: number, height: number, scale?: number) {
    // canvas的宽高
    this.app.view.width = width
    this.app.view.height = height
    // 渲染器的宽高
    this.app.screen.width = width
    this.app.screen.height = height
    this.drawBG()
    if(scale){
      if(this.mePerson){
        this.mePerson.update({scale})
      }
    }
  }

  drawBG() {
    if (!this.BgSprite) {
      const texture = PIXI.Texture.from('./map.jpeg');
      this.BgSprite = new PIXI.Sprite(texture)
      this.app.stage.addChild(this.BgSprite);;
    }
    this.BgSprite.position.set(0, 0);
    this.BgSprite.width = this.app.view.width;
    this.BgSprite.height = this.app.view.height;

  }

  drawMe(options: IPersonOptions) {
    if (!this.mePerson) {
      this.mePerson = new Person({
        ...options,
        app: this.app
      })
    } else {
      this.mePerson.update(options)
    }
  }


  drawPerson() { }

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






}

