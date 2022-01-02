// import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default {
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: "util",
    },
  },
  plugins: [vue()],
}

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()]
// })
