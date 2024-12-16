// @ts-ignore: 타입 에러 무시
import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        // @ts-ignore: Rollup 플러그인 타입 에러 무시
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
});
