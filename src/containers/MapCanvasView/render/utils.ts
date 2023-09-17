import * as PIXI from 'pixi.js';

PIXI.Assets.add("down", "/assets/avatar_down.png")
PIXI.Assets.add("up", "/assets/avatar_up.png")
PIXI.Assets.add("left", "/assets/avatar_left.png")
PIXI.Assets.add("right", "/assets/avatar_right.png")

let __textures = new Map<string, PIXI.Texture>()

export const loadTextures = async () => {
  await PIXI.Assets.load(["down", "up", "left", "right"])
  const downTexture = PIXI.Texture.from('down');
  const upTexture = PIXI.Texture.from('up');
  const leftTexture = PIXI.Texture.from('left');
  const rightTexture = PIXI.Texture.from('right');
  __textures.set("down", downTexture)
  __textures.set("up", upTexture)
  __textures.set("left", leftTexture)
  __textures.set("right", rightTexture)
}


export const getTextures = () => {
  return __textures
}
