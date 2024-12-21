import { defineConfig } from "vite";
import path from "path";
import mdx from "@mdx-js/rollup";
import svgr from "vite-plugin-svgr";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

const mdxOptions = {
  remarkPlugins: [],
  rehypePlugins: [],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mdx(mdxOptions),
    svgr(),
    viteReact(),
    TanStackRouterVite(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
 
});
