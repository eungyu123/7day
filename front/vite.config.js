import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// https로 리액트서버 실행
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync("./ssl/localhost+11-key.pem"),
      cert: fs.readFileSync("./ssl/localhost+11.pem"),
    },
  },
  plugins: [react()],
});
