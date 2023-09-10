import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), commonjs(), svgr({
      svgrOptions: {
        icon: true
      }
    })],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "assets": path.resolve(__dirname, "assets"),
      }
    }
  }
})
