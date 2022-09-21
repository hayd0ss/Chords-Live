import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import eslintPlugin from 'vite-plugin-eslint'
// import eslint from 'vite-plugin-eslint'
// import eslintPlugin from "@nabla/vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),],
  build: {
    chunkSizeWarningLimit: 2000,
  },
}
)

// eslint()eslint()
// eslintPlugin(),
