import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const requiredFiles = [
    "index.html",
    "coaches.html",
    "equipment.html",
    "gallery.html",
    "pricing.html",
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
    "src/assets/hero-training-member-lineup.jpg",
    "src/assets/equipment.png",
    "src/assets/gallery-group.png",
    "src/assets/gallery-class.png",
    "src/assets/gallery-sparring.png",
    "src/assets/coach-xie-feiyu.jpg",
    "src/assets/coach-zhu-cheng.jpg",
    "src/assets/coach-wan-zihao.jpg",
    "src/assets/contact-wechat-ilia.png",
    "src/assets/contact-zidian-wechat.jpg",
    "src/assets/equipment-full-kit.jpg",
    "src/assets/equipment-hard-protection.jpg",
    "src/assets/equipment-jacket.jpg",
    "src/assets/equipment-mask.jpg",
    "src/assets/equipment-shoes.jpg",
    "src/assets/location-map.png",
    "src/assets/member-gallery-briefing.jpg",
    "src/assets/member-gallery-boxing-lineup.jpg",
    "src/assets/member-gallery-group-armor.jpg",
    "src/assets/member-gallery-group-floor.jpg",
    "src/assets/member-gallery-lineup.jpg",
    "src/assets/member-gallery-lineup-purple.jpg",
    "src/assets/member-gallery-circle.jpg",
    "src/assets/member-gallery-drill.jpg",
    "src/assets/member-gallery-sparring.jpg",
    "src/assets/member-gallery-summer-lineup.jpg",
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

const [
    html,
    coachesHtml,
    equipmentHtml,
    galleryHtml,
    pricingHtml,
    app,
    styles,
    viteConfig,
    main,
    logger,
] =
    await Promise.all([
    readProjectFile("index.html"),
    readProjectFile("coaches.html"),
    readProjectFile("equipment.html"),
    readProjectFile("gallery.html"),
    readProjectFile("pricing.html"),
    readProjectFile("src/App.vue"),
    readProjectFile("src/styles.css"),
    readProjectFile("vite.config.ts"),
    readProjectFile("src/main.ts"),
    readProjectFile("src/utils/logger.ts"),
]);

if (!html.includes('src="/src/main.ts"')) {
    throw new Error("Vite TypeScript entry is not wired.");
}

if (!coachesHtml.includes('src="/src/main.ts"')) {
    throw new Error("Coaches page must use the Vue TypeScript entry.");
}

if (!equipmentHtml.includes('src="/src/main.ts"')) {
    throw new Error("Equipment page must use the Vue TypeScript entry.");
}

if (!galleryHtml.includes('src="/src/main.ts"')) {
    throw new Error("Gallery page must use the Vue TypeScript entry.");
}

if (!pricingHtml.includes('src="/src/main.ts"')) {
    throw new Error("Pricing page must use the Vue TypeScript entry.");
}

if (!viteConfig.includes('base: "/ZidianHomepage/"')) {
    throw new Error("GitHub Pages base path is missing.");
}

if (!viteConfig.includes("coaches.html")) {
    throw new Error("Coaches page must be included in the Vite build inputs.");
}

if (!viteConfig.includes("equipment.html")) {
    throw new Error("Equipment page must be included in the Vite build inputs.");
}

if (!viteConfig.includes("gallery.html")) {
    throw new Error("Gallery page must be included in the Vite build inputs.");
}

if (!viteConfig.includes("pricing.html")) {
    throw new Error("Pricing page must be included in the Vite build inputs.");
}

if (!app.includes('<script setup lang="ts">')) {
    throw new Error("App.vue must use TypeScript setup script.");
}

if (!app.includes("galleryDialog") || !app.includes("openGalleryDialog")) {
    throw new Error("Image preview behavior is missing.");
}

if (!app.includes("ref<HTMLDialogElement")) {
    throw new Error("Image preview dialog should be typed.");
}

if (!app.includes("closePreviewOnBackdrop")) {
    throw new Error("Image preview backdrop close behavior is missing.");
}

if (!app.includes("openMapPreview") || !app.includes("location-map-preview")) {
    throw new Error("Location map preview behavior is missing.");
}

if (!app.includes("isMemberGalleryPage") ||
    !app.includes("member-photo-wall") ||
    !app.includes("memberGalleryBriefing") ||
    !app.includes("memberGalleryLineupPurple") ||
    !app.includes("memberGalleryBoxingLineup") ||
    !app.includes("memberGallerySummerLineup")) {
    throw new Error("Member gallery page or assets are missing.");
}

if (app.includes("gallery-filter-tabs") || app.includes("gallery-thumbs")) {
    throw new Error("Member gallery should use simple image preview, not detail filters.");
}

if (!app.includes("coachProfiles") || !app.includes('href: "coaches.html"')) {
    throw new Error("Coach page data or navigation is missing.");
}

if (!app.includes("isCoachesPage") || !app.includes('v-if="isHomePage"')) {
    throw new Error("Home and coach pages must be split by Vue rendering state.");
}

if (app.includes('class="pathway') || app.includes('id="programs"')) {
    throw new Error("Beginner pathway and course system sections should stay removed.");
}

if (app.includes("schedule-card") || styles.includes(".schedule-card")) {
    throw new Error("Hero recent-training card should stay removed.");
}

if (app.includes("openBookingDialog") ||
    app.includes("bookingDialog") ||
    app.includes("bookingForm") ||
    app.includes("提交预约") ||
    styles.includes(".booking-dialog")) {
    throw new Error("Appointment buttons and booking dialog should stay removed.");
}

if (styles.includes(".trial-band") || styles.includes(".trial-action")) {
    throw new Error("Trial appointment band styles should stay removed.");
}

if (!app.includes("contactQrCards") ||
    !app.includes("contact-wechat-ilia.png") ||
    !app.includes("contact-zidian-wechat.jpg")) {
    throw new Error("Contact QR source images or data are missing.");
}

if (app.includes("faqs") || app.includes("toggleFaq") || styles.includes(".faq-grid")) {
    throw new Error("FAQ section should be replaced by the contact QR layout.");
}

if (app.includes('{ href: "index.html#schedule"') ||
    app.includes('{ href: "index.html#contact"') ||
    app.includes('{ href: "index.html#about"') ||
    app.includes('{ href: "index.html#programs"')) {
    throw new Error("Header navigation should only keep home plus separate pages.");
}

if (!app.includes("isEquipmentPage") || !app.includes("equipmentStages")) {
    throw new Error("Equipment page state or data is missing.");
}

if (!app.includes("hero-training-member-lineup.jpg")) {
    throw new Error("Homepage hero should use the member lineup background image.");
}

if (!app.includes("南昌市新建区黄家湖西路198号南昌紫电剑社") ||
    !app.includes("locationMap") ||
    !app.includes("copyLocationAddress")) {
    throw new Error("Location address, map asset, or copy behavior is missing.");
}

if (!app.includes('href: "equipment.html"')) {
    throw new Error("Equipment navigation should point to the separate page.");
}

if (!app.includes('href: "gallery.html"')) {
    throw new Error("Member showcase navigation should point to the gallery page.");
}

if (!app.includes("isPricingPage") || !app.includes('href: "pricing.html"')) {
    throw new Error("Pricing page state or navigation is missing.");
}

if (app.includes('id="membership" aria-labelledby="pricing-title"') &&
    !app.includes('v-else-if="isPricingPage"')) {
    throw new Error("Pricing content should be rendered on the separate page.");
}

if (app.includes('href: "index.html#gear"') || app.includes('id="gear"')) {
    throw new Error("Equipment content should not remain stacked on the home page.");
}

if (!app.includes("谢飞宇，军刀、古典花剑教练")) {
    throw new Error("Xie Feiyu coach text is missing.");
}

if (!app.includes("朱铖，迅捷剑、长剑、徒手战斗教练")) {
    throw new Error("Zhu Cheng coach text is missing.");
}

if (!app.includes("万子豪，长剑教练")) {
    throw new Error("Wan Zihao coach text is missing.");
}

if (!styles.includes(".image-preview-dialog") || !styles.includes(".image-preview-viewer")) {
    throw new Error("Image preview styles are missing.");
}

if (!styles.includes(".location-map-preview")) {
    throw new Error("Location map preview styles are missing.");
}

if (styles.includes(".gallery-detail") || styles.includes(".gallery-thumbs")) {
    throw new Error("Old gallery detail styles should be removed.");
}

if (!styles.includes(".coach-grid") || !styles.includes(".coach-card")) {
    throw new Error("Coach section styles are missing.");
}

if (styles.includes(".pathway") || styles.includes(".program-grid")) {
    throw new Error("Removed home sections should not keep stale styles.");
}

if (!styles.includes(".equipment-guide") || !styles.includes(".equipment-stage")) {
    throw new Error("Equipment page styles are missing.");
}

if (!styles.includes(".pricing-page") || !styles.includes(".pricing-board")) {
    throw new Error("Pricing page styles are missing.");
}

if (!styles.includes(".location-card") || !styles.includes(".location-map")) {
    throw new Error("Location section styles are missing.");
}

if (!styles.includes(".member-photo-wall") || !styles.includes(".member-photo-tile")) {
    throw new Error("Member gallery page styles are missing.");
}

if (app.includes('src="/assets/') || app.includes('src: "/assets/')) {
    throw new Error("App.vue should use bundled asset URLs, not root asset paths.");
}

if (!main.includes("createApp")) {
    throw new Error("Vue app bootstrap is missing.");
}

if (!logger.includes("logInfo") || !logger.includes("logError")) {
    throw new Error("Project logger helpers are missing.");
}

console.log("Site validation passed.");
