import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs'
import svgr from "vite-plugin-svgr";


const genBaseUrl = (mode) => {
  switch (mode) {
    case "production":
      return "/meta-view/"
    default:
      return "/"
  }
}


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), commonjs(), svgr({
      svgrOptions: {
        icon: true
      }
    })],
    base: genBaseUrl(mode),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "assets": path.resolve(__dirname, "assets"),
      }
    }
  }
})
