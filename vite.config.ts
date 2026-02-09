import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
base: '/'

//base: '/organisedtoast.github.io/'
//Normally, you are hosting on GitHub Pages, you need to set the base path to the repository name.
//For example, if your repository is named "my-app", you would set base: '/my-app/'
//However, this didn't work for me, so I set it to '/' according to a forum to see what happens.

}));
