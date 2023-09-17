import { Position } from './../../../types/index';
import { Direction } from '../../../types/index';
import { getTextures, loadTextures } from './utils';
import { IPersonOptions, IPersonUpdateOptions, IPersonDrawOptions } from "./types"
import { DEFAULT_AVATAR_WIDTH, DEFAULT_AVATAR_HEIGHT, DEFAULT_NAME_HEIGHT } from "../../../utils/constant"
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

  constructor(options: IPersonOptions) {
    this.options = options;
    // const {}
    // if(position){

    // }
    // this.draw({
    //   position,
    //   direction
    // })
  }

  // TODO:scale
  async draw(o: IPersonDrawOptions) {
    const { uid = "", app, isMe, } = this.options
    const { position = [0, 0, 0], direction = "down" } = o
    await loadTextures()
    this.nameText.text = uid
    this.nameText.style = {
      fontSize: 12,
      fill: "white",
      align: 'center',
    }
    // 文字
    this.nameText.height = DEFAULT_NAME_HEIGHT
    this.nameText.position.x = 0;
    this.nameText.position.y = 0;
    // 文字背景
    const textBackround = new PIXI.Graphics();
    textBackround.beginFill(isMe ? "#eb2f96" : "#bae0ff");
    textBackround.drawRect(0, 0, this.nameText.width, this.nameText.height);
    textBackround.endFill();
    // 人物 avatar
    this._transDirection(direction || "down")
    this.personSprite.position.y = this.nameText.height;
    this.personSprite.position.x = (this.nameText.width - DEFAULT_AVATAR_WIDTH) / 2;
    this.personSprite.width = DEFAULT_AVATAR_WIDTH;
    this.personSprite.height = DEFAULT_AVATAR_HEIGHT;
    // 人物包裹器
    this.personContainer.addChild(textBackround)
    this.personContainer.addChild(this.nameText);
    this.personContainer.addChild(this.personSprite);
    // 计算位置
    let renderPosition = this._trans2RenderPosition(position)
    this.personContainer.position.x = renderPosition[0]
    this.personContainer.position.y = renderPosition[1]
    app!.stage.addChild(this.personContainer);
  }

  update(options: IPersonUpdateOptions) {
    const { position, direction } = options
    if (position) {
      this.runTo(position)
      this.options.position = position
    }
    if (direction) {
      this._transDirection(direction)
    }
    if (this.scale) {
      this._setScale(this.scale)
    }
  }


  runTo(p: Position) {
    if (this.personContainer) {
      const renderPosition = this._trans2RenderPosition(p)
      const [x, y] = renderPosition
      gsap.to(this.personContainer, { x: x, y: y, duration: 0.5, ease: "power3" });
    }
  }

  destory() {
    this.personContainer.destroy()
    this.personSprite.destroy()
    this.personContainer = null as any
    this.personSprite = null as any
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

  private _trans2RenderPosition(p: Position) {
    // 计算位置
    let x = p[0] || 0
    let y = p[1] || 0
    let positionX = x - (this.nameText?.width || 0) / 2
    let positionY = y - (this.nameText?.height || 0) - (this.personSprite.height / 2)
    return [positionX, positionY, p[2]]
  }

  private _setScale(scale: number) {
    this.scale = scale
    this.personContainer.scale.set(this.scale)
    console.log("[meta] this.scale", this.scale)
  }

}


