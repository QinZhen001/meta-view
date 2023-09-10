import { Direction } from '../../../types/index';
import { getTextures, loadTextures } from './utils';
import { IPersonOptions, IPersonUpdateOptions } from "./types"
import * as PIXI from 'pixi.js';
import gsap from "gsap"




const PERSON_WIDTH = 50;
const PERSON_HEIGHT = 56;

export class Person {
  options: IPersonOptions;
  textures: Record<string, any> = new Map()
  personSprite: PIXI.Sprite = new PIXI.Sprite()
  personContainer: PIXI.Container = new PIXI.Container()
  circle1?: PIXI.Graphics;
  circle2?: PIXI.Graphics;

  constructor(options: IPersonOptions) {
    this.options = options;
    this.init()
  }

  async init() {
    const { uid, app, position = [], isMe, direction } = this.options
    await loadTextures()
    // 文字
    const text = new PIXI.Text(uid, {
      fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto',
      fontSize: 12,
      fill: "white",
      align: 'center',
    });
    text.position.x = 0;
    text.position.y = 0;
    // 文字背景
    const textBackround = new PIXI.Graphics();
    textBackround.beginFill(isMe ? "#eb2f96" : "#bae0ff");
    textBackround.drawRect(0, 0, text.width, text.height);
    textBackround.endFill();
    // 人物
    this._transDirection(direction || "down")
    this.personSprite.position.y = text.height;
    this.personSprite.position.x = (text.width - PERSON_WIDTH) / 2;
    this.personSprite.width = PERSON_WIDTH;
    this.personSprite.height = PERSON_HEIGHT;
    // r1
    // if (isMe && r1) {
    //   this.circle1 = new PIXI.Graphics();
    //   this._updateR1(r1)
    // }
    // // r2
    // if (isMe && r2) {
    //   this.circle2 = new PIXI.Graphics();
    //   this._updateR2(r2)
    // }
    // 容器
    this.circle2 && this.personContainer.addChild(this.circle2)
    this.circle1 && this.personContainer.addChild(this.circle1)
    this.personContainer.addChild(textBackround)
    this.personContainer.addChild(text);
    this.personContainer.addChild(this.personSprite);
    this.personContainer.position.x = position[0] || 0
    this.personContainer.position.y = position[1] || 0
    app!.stage.addChild(this.personContainer);
  }

  update(options: IPersonUpdateOptions) {
    const { position, direction } = options
    if (position && position != this.options.position) {
      this.runTo(position[0], position[1])
      this.options.position = position
    }
    if (direction && direction != this.options.direction) {
      this._transDirection(direction)
    }
    // if (r1 && r1 != this.options.r1) {
    //   this._updateR1(r1)
    // }
    // if (r2 && r2 != this.options.r2) {
    //   this._updateR2(r2)
    // }
  }


  runTo(x: number, y: number) {
    if (this.personContainer) {
      gsap.to(this.personContainer, { x: x, y: y, duration: 0.5, ease: "power3" });
    }
  }

  destory() {
    this.personContainer.destroy()
    this.personSprite.destroy()
    this.circle1?.destroy()
    this.circle2?.destroy()
    this.personContainer = null as any
    this.personSprite = null as any
    this.circle1 = null as any
    this.circle2 = null as any
  }

  // -------------------- private --------------------


  private _transDirection(d: Direction) {
    let textures = getTextures()
    let texture = undefined
    switch (d) {
      case "up":
        texture = textures.get('up')!;
        this.personSprite.texture = texture;
        break
      case "down":
        texture = textures.get('down')!;
        this.personSprite.texture = texture;
        break
      case "left":
        texture = textures.get('left')!;
        this.personSprite.texture = texture;
        break
      case "right":
        texture = textures.get('right')!;
        this.personSprite.texture = texture;
        break
    }
    this.options.direction = d
  }


}


