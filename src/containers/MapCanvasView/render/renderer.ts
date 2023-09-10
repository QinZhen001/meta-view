import * as PIXI from 'pixi.js';
import { Person } from './person';
import { IRenderOptions, IPersonOptions, IPersonUpdateOptions, RemoteUserPayloads, InOutEvents, EventHandler } from "./types"
import { TEAM_ID1, TEAM_ID2 } from "../../../utils/constant"
import mitt from 'mitt'
import { Position } from '../../../types';


// TODO:
// status renderer 状态改变
// 对外api根据状态判断

export class Renderer {
  options: IRenderOptions
  othersPerson: Map<string, Person> = new Map()
  mePerson?: Person
  room1: PIXI.Graphics = new PIXI.Graphics();
  room2: PIXI.Graphics = new PIXI.Graphics();
  BgSprite?: PIXI.Sprite
  app: PIXI.Application
  scaleX: number = 1
  scaleY: number = 1
  isInRoom: boolean = false

  private _emitter = mitt<InOutEvents>()

  constructor(options: IRenderOptions) {
    this.options = options;
    const { node, width, height } = this.options
    this.app = new PIXI.Application({
      background: '#303032',
      width: width,
      height: height,
      // resizeTo: node,
      // antialias: true,
    });
    // @ts-ignore
    node.appendChild(this.app.view);
  }

  async init() {
    this._draw()

  }

  resize(width: number, height: number) {
    this.app.renderer.resize(width, height);
    this._draw()
  }

  drawPerson(options: IPersonOptions) {

  }

  on<Key extends keyof InOutEvents>(type: Key, handler: EventHandler<InOutEvents[Key]>) {
    return this._emitter.on(type, handler)
  }

  emit<Key extends keyof InOutEvents>(event: Key, data: InOutEvents[Key]) {
    return this._emitter.emit(event, data)
  }


  // async setMe(options: IPersonOptions) {
  //   if (!this.mePerson) {
  //     this.mePerson = new Person({
  //       ...options,
  //       app: this.app
  //     })
  //   } else {
  //     if (options.position) {
  //       // let roomId = this._checkIsHitRoom(options.position)
  //       // if (roomId) {
  //       //   debugger
  //       //   let success = false
  //       //   if (this.isInRoom) {
  //       //     success = !!(this.options.leaveRoom && await this.options.leaveRoom(roomId))
  //       //   } else {
  //       //     success = !!(this.options.joinRoom && await this.options.joinRoom(roomId))
  //       //   }
  //       //   if (success) {
  //       //     this.isInRoom = !this.isInRoom
  //       //     this.mePerson.update(options)
  //       //   }
  //       //   return
  //       // }
  //       this.mePerson.update(options)
  //       return
  //     }
  //     this.mePerson.update(options)
  //   }
  // }

  // setOthersPerson(items: RemoteUserPayloads) {
  //   Object.keys(items).forEach(uid => {
  //     const item = items[uid]
  //     if (!this?.othersPerson.has(uid)) {
  //       // new 
  //       this.othersPerson?.set(uid, new Person({
  //         ...item,
  //         app: this.app
  //       }))
  //     } else {
  //       // update
  //       const person = this.othersPerson.get(uid)
  //       person?.update(items[uid])
  //     }
  //   })
  //   for (let [uid, person] of this.othersPerson) {
  //     // del
  //     if (!items[uid]) {
  //       person.destory()
  //       this.othersPerson.delete(uid)
  //     }
  //   }
  // }


  destory() {
    this.app.destroy()
  }

  // -------------- private methods --------------

  private _draw() {
    this._drawBG()
    // this._drawRoom1()
    // this._drawRoom2()
  }


  private _drawBG() {
    const texture = PIXI.Texture.from('./map.jpeg');
    this.BgSprite = new PIXI.Sprite(texture);
    this.BgSprite.position.set(0, 0);
    this.BgSprite.width = this.app.view.width;
    this.BgSprite.height = this.app.view.height;
    this.app.stage.addChild(this.BgSprite);
  }

  // private _drawRoom1() {
  //   const {
  //     x, y, width, height
  //   } = getRoom1Rect()
  //   this.room1.beginFill(0x66ccff);
  //   this.room1.drawRect(0, 0, width, height);
  //   // room.visible = false
  //   this.room1.endFill();
  //   this.room1.position.set(x, y);
  //   this.app.stage.addChild(this.room1);
  // }


  // private _drawRoom2() {
  //   const { x, y, width, height } = getRoom2Rect()
  //   this.room2.beginFill(0x66ccff);
  //   this.room2.drawRect(0, 0, width, height);
  //   // room.visible = false
  //   this.room2.endFill();
  //   this.room2.position.set(x, y);
  //   this.app.stage.addChild(this.room2);
  // }


  // private _checkIsHitRoom(position: Position): string {
  //   const [curX, curY] = position
  //   console.log('curX, curY', curX, curY)
  //   const {
  //     x: x1,
  //     y: y1,
  //     width: width1,
  //     height: height1
  //   } = getRoom1Rect()
  //   let startX = x1
  //   let startY = y1
  //   let endX = x1 + width1
  //   let endY = y1 + height1
  //   console.log('startX, startY, endX, endY', startX, startY, endX, endY)
  //   if (curX >= startX && curX <= endX && curY >= startY && curY <= endY) {
  //     debugger
  //     return TEAM_ID1
  //   }
  //   const {
  //     x: x2,
  //     y: y2,
  //     width: width2,
  //     height: height2
  //   } = getRoom1Rect()
  //   startX = x2
  //   startY = y2
  //   endX = x2 + width2
  //   endY = y2 + height2
  //   if (curX >= startX && curX <= endX && curY >= startY && curY <= endY) {
  //     debugger
  //     return TEAM_ID2
  //   }
  //   return ""
  // }

}

