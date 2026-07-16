import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const requiredFiles = [
    "index.html",
    "package.json",
    "pnpm-lock.yaml",
    "tsconfig.json",
    "vite.config.ts",
    "src/App.vue",
    "src/main.ts",
    "src/styles.css",
    "src/utils/logger.ts",
    "src/assets/crest.png",
    "src/assets/hero-training.png",
    "src/assets/equipment.png",
    "src/assets/gallery-group.png",
    "src/assets/gallery-class.png",
    "src/assets/gallery-sparring.png",
];

/**
 * 确认项目所需文件存在。
 * @param {string[]} files 需要检查的文件路径列表。
 */
async function assertRequiredFiles(files) {
    await Promise.all(files.map(async (file) => {
        try {
            await stat(join(root, file));
        } catch (error) {
            throw new Error(`Missing required file: ${file}`, { cause: error });
        }
    }));
}

/**
 * 读取项目文件内容。
 * @param {string} file 需要读取的文件路径。
 * @returns {Promise<string>} 文件文本内容。
 */
async function readProjectFile(file) {
    return readFile(join(root, file), "utf8");
}

await assertRequiredFiles(requiredFiles);

const [html, app, styles, viteConfig, main, logger] = await Promise.all([
    readProjectFile("index.html"),
    readProjectFile("src/App.vue"),
    readProjectFile("src/styles.css"),
    readProjectFile("vite.config.ts"),
    readProjectFile("src/main.ts"),
    readProjectFile("src/utils/logger.ts"),
]);

if (!html.includes('src="/src/main.ts"')) {
    throw new Error("Vite TypeScript entry is not wired.");
}

if (!viteConfig.includes('base: "/ZidianHomepage/"')) {
    throw new Error("GitHub Pages base path is missing.");
}

if (!app.includes('<script setup lang="ts">')) {
    throw new Error("App.vue must use TypeScript setup script.");
}

if (!app.includes("ref<HTMLDialogElement")) {
    throw new Error("Booking dialog should be typed.");
}

if (!app.includes("打开预约弹窗")) {
    throw new Error("Chinese JSDoc comments are missing for openBookingDialog.");
}

if (app.includes('src="/assets/') || app.includes('src: "/assets/')) {
    throw new Error("App.vue should use bundled asset URLs, not root asset paths.");
}

if (!styles.includes("var(--trial-watermark-image)")) {
    throw new Error("Trial watermark should use the bundled crest asset.");
}

if (!main.includes("createApp")) {
    throw new Error("Vue app bootstrap is missing.");
}

if (!logger.includes("logInfo") || !logger.includes("logError")) {
    throw new Error("Project logger helpers are missing.");
}

console.log("Site validation passed.");
