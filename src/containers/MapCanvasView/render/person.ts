import { Position } from './../../../types/index';
import { Direction } from '../../../types/index';
import { getTextures, loadTextures } from './utils';
import { IPersonOptions, IPersonDrawOptions } from "./types"
import { DEFAULT_AVATAR_WIDTH, DEFAULT_AVATAR_HEIGHT, DEFAULT_NAME_HEIGHT, DEFAULT_NAME_WIDTH, DEFAULT_FIGURE_WIDTH } from "../../../utils/constant"
import * as PIXI from 'pixi.js';
import gsap from "gsap"



// position [x,y] => 为personContainer中personSprite的center坐标

export class Person {
  options: IPersonOptions;
  textures: Record<string, any> = new Map()
  personSprite: PIXI.Sprite = new PIXI.Sprite()
  personContainer: PIXI.Container = new PIXI.Container()
  nameText: PIXI.Text = new PIXI.Text()
  scale: number = 1
  direction: Direction = "down"
  position: Position = [0, 0, 0]
  uid: string = ""
  inited: boolean = false


  constructor(options: IPersonOptions) {
    this.options = options;

  }

  async draw(o: IPersonDrawOptions) {
    let { app, isMe, } = this.options
    let { position, direction, scale, uid } = o
    if (position) {
      this.position = position
    }
    if (direction) {
      this.direction = direction
    }
    if (scale) {
      this.scale = scale
    }
    if (uid) {
      this.uid = uid
    }
    console.log("[meta] draw people", this.position, this.direction, this.scale)
    this.nameText.text = this.uid
    this.nameText.style = {
      fontSize: 12,
      fill: "white",
      align: 'center',
    }
    // 文字
    this.nameText.height = DEFAULT_NAME_HEIGHT
    this.nameText.width = DEFAULT_NAME_WIDTH
    this.nameText.position.x = 0;
    this.nameText.position.y = 0;
    // 文字背景
    const textBackround = new PIXI.Graphics();
    textBackround.beginFill(isMe ? "#eb2f96" : "#bae0ff");
    textBackround.drawRect(0, 0, this.nameText.width, this.nameText.height);
    textBackround.endFill();
    // 人物 avatar
    await this._transDirection(this.direction)

    this.personSprite.width = DEFAULT_AVATAR_WIDTH;
    this.personSprite.height = DEFAULT_AVATAR_HEIGHT;
    this.personSprite.position.x = (this.nameText.width - this.personSprite.width) / 2;
    this.personSprite.position.y = this.nameText.height;

    // 人物包裹器
    this.personContainer.addChild(textBackround)
    this.personContainer.addChild(this.nameText);
    this.personContainer.addChild(this.personSprite);
    // 计算位置
    let renderPosition = this._trans2RenderPosition(this.position)
    this.personContainer.position.x = renderPosition[0]
    this.personContainer.position.y = renderPosition[1]
    this.personContainer.width = DEFAULT_FIGURE_WIDTH * this.scale
    if (!this.inited) {
      app!.stage.addChild(this.personContainer);
    }
    this.inited = true
  }


  runTo(p: Position) {
    if (this.personContainer) {
      const renderPosition = this._trans2RenderPosition(p)
      const [x, y] = renderPosition
      this.position = [x, y, 0]
      gsap.to(this.personContainer, { x: x, y: y, duration: 2, ease: "power3" });
    }
  }

  destory() {
    this.personContainer.destroy()
    this.personSprite.destroy()
    this.personContainer = null as any
    this.personSprite = null as any
  }

  // -------------------- private --------------------


  private async _transDirection(d: Direction) {
    let textures = await getTextures()
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
    this.direction = d
  }

  private _trans2RenderPosition(p: Position) {
    // 计算位置
    let x = p[0] || 0
    let y = p[1] || 0
    let positionX = x - (this.nameText?.width || 0) / 2
    let positionY = y - (this.nameText?.height || 0) - (this.personSprite.height / 2)

    return [positionX, positionY, 0]
  }


}


