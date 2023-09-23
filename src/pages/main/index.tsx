import { useEffect, useRef } from "react";
import * as PIXI from 'pixi.js';
import "./index.scss"

let app = null
const loader= new PIXI.Loader();   


// function getTextureFromCache(
//   name,
//   url
// ) {
//   const { loader } = app;
//   const cacheResource = loader.resources[name];
//   let texture = cacheResource?.texture;
//   if (!texture || cacheResource?.error) {
//     const newUrl = `${url}?retry=1`; // newUrl是由于同一链接loader会拿失败的那个继续用
//     texture = PIXI.Texture.from(newUrl);
//   }
//   return texture;
// }



const MainPage = () => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const init = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    app = new PIXI.Application({
      // background: '#1099bb',
      // resizeTo: demoRef.current,
      antialias: true,
      width: width,
      height: height,
    });
    // @ts-ignore
    window.app = app
    app.view.width = width
    app.view.height = height
    app.screen.width = width
    app.screen.height = height
    // @ts-ignore
    wrapperRef.current!.appendChild(app.view);
  }


  const initMap = () => { }

  const initPersonContainer = () => {
    //   const textureArray = [
    //     PIXI.Texture.from('img_01.png'),
    //     PIXI.Texture.from('img_02.png'),
    //     ...
    //  ];

  }

  useEffect(() => {
    init()
    initMap()
    initPersonContainer()
  }, [])

  return <div className="main-page">
    <div className="canvas-wrapper" ref={wrapperRef}>
    </div>
  </div>

}

export default MainPage;
