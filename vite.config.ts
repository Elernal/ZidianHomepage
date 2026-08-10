import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";

export default defineConfig({
    base: "/ZidianHomepage/",
    plugins: [vue()],
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, "index.html"),
                coaches: resolve(__dirname, "coaches.html"),
                equipment: resolve(__dirname, "equipment.html"),
                gallery: resolve(__dirname, "gallery.html"),
            },
        },
    },
    server: {
        host: "127.0.0.1",
        port: 5178,
    },
});
