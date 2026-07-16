<template>
    <header class="site-header" :class="{ 'is-open': isNavOpen }">
        <a class="brand" href="#top" aria-label="返回首页" @click="closeNav">
            <img :src="assetUrls.crest" alt="紫电剑社社徽" width="72" height="72">
            <span>
                <strong>紫电剑社</strong>
                <small>HEMA 历史剑术</small>
            </span>
        </a>
        <button
            class="nav-toggle"
            type="button"
            aria-label="打开导航"
            :aria-expanded="isNavOpen"
            @click="toggleNav"
        >
            <i class="fa-solid fa-bars" aria-hidden="true"></i>
        </button>
        <nav class="nav-links" aria-label="主导航">
            <a
                v-for="item in navItems"
                :key="item.href"
                :href="item.href"
                @click="closeNav"
            >
                {{ item.label }}
            </a>
        </nav>
        <button class="header-cta" type="button" @click="openBookingDialog">
            预约体验课
        </button>
    </header>

    <main id="top">
        <section class="hero" aria-labelledby="hero-title">
            <img
                class="hero-image"
                :src="assetUrls.heroTraining"
                alt="两名 HEMA 学员在现代训练馆中对练"
            >
            <div class="hero-overlay"></div>
            <div class="hero-content section-shell">
                <div class="hero-copy">
                    <p class="eyebrow">历史剑术 · 现代训练</p>
                    <h1 id="hero-title">紫电剑社<br>HEMA 历史剑术</h1>
                    <p class="hero-subtitle">以历史为根，以剑会友。</p>
                    <div class="hero-points" aria-label="俱乐部特点">
                        <span v-for="point in heroPoints" :key="point.label">
                            <i :class="point.icon" aria-hidden="true"></i>
                            {{ point.label }}
                        </span>
                    </div>
                    <div class="hero-actions">
                        <button
                            class="gold-button"
                            type="button"
                            @click="openBookingDialog"
                        >
                            预约体验课
                            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                        </button>
                        <a class="ghost-link" href="#programs">
                            了解课程
                            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
                <aside class="schedule-card" id="schedule" aria-labelledby="schedule-title">
                    <div class="schedule-head">
                        <h2 id="schedule-title">本周训练</h2>
                        <button type="button" @click="scrollToSection('#programs')">
                            查看完整日程
                            <i class="fa-solid fa-angle-right" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="schedule-list">
                        <article
                            v-for="item in schedules"
                            :key="`${item.day}-${item.title}`"
                            class="schedule-row"
                        >
                            <div>
                                <strong>{{ item.day }}</strong>
                                <small>{{ item.time }}</small>
                            </div>
                            <strong>{{ item.title }}</strong>
                            <span class="tag">{{ item.tag }}</span>
                        </article>
                    </div>
                    <p class="schedule-location">
                        <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
                        北京市朝阳区 某某训练中心
                    </p>
                </aside>
            </div>
        </section>

        <section class="pathway section-shell" id="about" aria-labelledby="pathway-title">
            <div class="pathway-copy">
                <p class="section-kicker">科学系统的训练体系</p>
                <div class="section-intro">
                    <h2 id="pathway-title">新手入门</h2>
                    <p>从零开始，逐步理解历史剑术的核心技术、身体控制和安全对练。</p>
                    <a href="#programs">了解课程体系</a>
                </div>
            </div>
            <div class="step-track">
                <article v-for="step in steps" :key="step.title" class="step-card">
                    <span class="step-icon">
                        <i :class="step.icon" aria-hidden="true"></i>
                    </span>
                    <h3>{{ step.title }}</h3>
                    <p>{{ step.body }}</p>
                </article>
            </div>
        </section>

        <section class="gear-section" id="gear" aria-labelledby="gear-title">
            <div class="section-shell gear-grid">
                <div class="gear-copy">
                    <p class="section-kicker">安全优先，享受训练</p>
                    <h2 id="gear-title">安全装备</h2>
                    <p>合规护具与专业指导，让你在安全的环境中专注技术成长。</p>
                    <a href="#membership">查看装备指南</a>
                    <div class="gear-icons">
                        <div v-for="gear in gears" :key="gear.label" class="gear-item">
                            <span class="gear-icon">
                                <i :class="gear.icon" aria-hidden="true"></i>
                            </span>
                            <span>{{ gear.label }}</span>
                        </div>
                    </div>
                </div>
                <img
                    class="gear-photo"
                    :src="assetUrls.equipment"
                    alt="HEMA 面罩、手套、防护服和训练剑"
                    loading="lazy"
                >
            </div>
        </section>

        <section class="programs section-shell" id="programs" aria-labelledby="programs-title">
            <div class="program-head">
                <div>
                    <p class="section-kicker">按阶段进阶</p>
                    <h2 id="programs-title">课程体系</h2>
                </div>
                <div class="program-tabs" role="tablist" aria-label="课程筛选">
                    <button
                        v-for="filter in programFilters"
                        :key="filter.value"
                        type="button"
                        :class="{ 'is-active': activeProgramFilter === filter.value }"
                        @click="activeProgramFilter = filter.value"
                    >
                        {{ filter.label }}
                    </button>
                </div>
            </div>
            <div class="program-grid">
                <article
                    v-for="program in visiblePrograms"
                    :key="program.title"
                    class="program-card"
                >
                    <i :class="program.icon" aria-hidden="true"></i>
                    <h3>{{ program.title }}</h3>
                    <p>{{ program.body }}</p>
                    <button type="button" @click="openBookingDialog">咨询课程</button>
                </article>
            </div>
        </section>

        <section class="gallery section-shell" aria-labelledby="gallery-title">
            <div class="section-row">
                <div>
                    <p class="section-kicker">训练现场</p>
                    <h2 id="gallery-title">会员风采</h2>
                </div>
                <button class="text-button" type="button" @click="showToast(galleryMessage)">
                    查看更多照片
                    <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </button>
            </div>
            <div class="gallery-grid">
                <figure v-for="item in galleryItems" :key="item.title" class="gallery-item">
                    <img :src="item.src" :alt="item.alt" loading="lazy">
                    <button type="button" @click="showGalleryToast(item.title)">
                        <span class="gallery-caption">{{ item.title }}</span>
                    </button>
                </figure>
            </div>
        </section>

        <section
            class="trial-band"
            id="membership"
            aria-labelledby="trial-title"
            :style="trialBandStyle"
        >
            <div class="section-shell trial-grid">
                <div>
                    <p class="section-kicker">迈出第一步</p>
                    <h2 id="trial-title">预约体验课</h2>
                    <p>无需基础，装备可租借，教练全程指导。</p>
                    <div class="trial-features">
                        <span v-for="feature in trialFeatures" :key="feature.label">
                            <i :class="feature.icon" aria-hidden="true"></i>
                            {{ feature.label }}
                        </span>
                    </div>
                </div>
                <div class="trial-action">
                    <button
                        class="gold-button"
                        type="button"
                        @click="openBookingDialog"
                    >
                        立即预约体验课
                        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </button>
                    <p>也可咨询微信客服获取最近开课时间。</p>
                </div>
            </div>
        </section>

        <section class="faq section-shell" aria-labelledby="faq-title">
            <div class="section-row">
                <div>
                    <p class="section-kicker">常见问题</p>
                    <h2 id="faq-title">加入前想知道的事</h2>
                </div>
                <a class="ghost-link dark" href="#contact">联系教练</a>
            </div>
            <div class="faq-grid">
                <article
                    v-for="(faq, index) in faqs"
                    :key="faq.question"
                    class="faq-item"
                    :class="{ 'is-open': openedFaqs.has(index) }"
                >
                    <button
                        class="faq-question"
                        type="button"
                        :aria-expanded="openedFaqs.has(index)"
                        @click="toggleFaq(index)"
                    >
                        {{ faq.question }}
                        <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
                    </button>
                    <p class="faq-answer">{{ faq.answer }}</p>
                </article>
            </div>
        </section>
    </main>

    <footer class="site-footer" id="contact">
        <div class="section-shell footer-grid">
            <div class="footer-brand">
                <img :src="assetUrls.crest" alt="" width="78" height="78" loading="lazy">
                <div>
                    <strong>紫电剑社</strong>
                    <p>以历史为根，以剑会友。</p>
                </div>
            </div>
            <div class="footer-links">
                <a href="#about">关于我们</a>
                <a href="#programs">课程训练</a>
                <a href="#schedule">训练日程</a>
                <a href="#membership">加入我们</a>
            </div>
            <div class="footer-contact">
                <span>北京市朝阳区 某某训练中心</span>
                <span>contact@zidian-sword.club</span>
                <div class="socials" aria-label="社交媒体">
                    <a href="#" aria-label="微信"><i class="fa-brands fa-weixin"></i></a>
                    <a href="#" aria-label="微博"><i class="fa-brands fa-weibo"></i></a>
                    <a href="#" aria-label="哔哩哔哩"><i class="fa-brands fa-bilibili"></i></a>
                </div>
            </div>
        </div>
    </footer>

    <dialog ref="bookingDialog" class="booking-dialog" aria-labelledby="booking-title">
        <form method="dialog" class="booking-form" @submit.prevent="submitBooking">
            <button
                class="dialog-close"
                type="button"
                aria-label="关闭预约弹窗"
                @click="closeBookingDialog"
            >
                <i class="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
            <p class="section-kicker">体验课预约</p>
            <h2 id="booking-title">选择你的第一节训练</h2>
            <label>
                姓名
                <input
                    v-model="bookingForm.name"
                    name="name"
                    type="text"
                    placeholder="请输入姓名"
                    required
                >
            </label>
            <label>
                联系方式
                <input
                    v-model="bookingForm.contact"
                    name="contact"
                    type="tel"
                    placeholder="手机或微信"
                    required
                >
            </label>
            <label>
                体验时段
                <select v-model="bookingForm.slot" name="slot" required>
                    <option value="">请选择时段</option>
                    <option v-for="slot in bookingSlots" :key="slot">{{ slot }}</option>
                </select>
            </label>
            <button class="gold-button" type="submit">提交预约</button>
            <p class="form-note">提交后教练会与你确认装备尺码和到场时间。</p>
        </form>
    </dialog>

    <div class="toast" :class="{ 'is-visible': toastMessage }" role="status" aria-live="polite">
        {{ toastMessage }}
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";

import crestUrl from "./assets/crest.png";
import equipmentUrl from "./assets/equipment.png";
import galleryClassUrl from "./assets/gallery-class.png";
import galleryGroupUrl from "./assets/gallery-group.png";
import gallerySparringUrl from "./assets/gallery-sparring.png";
import heroTrainingUrl from "./assets/hero-training.png";
import { logError, logInfo } from "./utils/logger";

type ProgramFilter = "all" | "beginner" | "advanced";

interface NavItem {
    href: string;
    label: string;
}

interface IconText {
    icon: string;
    label: string;
}

interface ScheduleItem {
    day: string;
    time: string;
    title: string;
    tag: string;
}

interface CardItem {
    icon: string;
    title: string;
    body: string;
}

interface ProgramItem extends CardItem {
    type: ProgramFilter;
}

interface GalleryItem {
    src: string;
    alt: string;
    title: string;
}

interface FaqItem {
    question: string;
    answer: string;
}

const navItems: NavItem[] = [
    { href: "#top", label: "首页" },
    { href: "#about", label: "关于我们" },
    { href: "#programs", label: "课程体系" },
    { href: "#schedule", label: "训练日程" },
    { href: "#gear", label: "装备指南" },
    { href: "#membership", label: "会员与费用" },
    { href: "#contact", label: "联系我们" },
];

const heroPoints: IconText[] = [
    { icon: "fa-solid fa-landmark", label: "历史传承" },
    { icon: "fa-solid fa-bullseye", label: "科学训练" },
    { icon: "fa-solid fa-shield-halved", label: "安全第一" },
    { icon: "fa-solid fa-people-group", label: "社区友好" },
];

const schedules: ScheduleItem[] = [
    { day: "周三", time: "19:00 - 21:00", title: "长剑基础", tag: "开放报名" },
    { day: "周四", time: "19:00 - 21:00", title: "意大利剑术", tag: "开放报名" },
    { day: "周六", time: "14:00 - 16:00", title: "对练与实战", tag: "开放报名" },
    { day: "周日", time: "10:00 - 12:00", title: "新手入门课", tag: "名额有限" },
];

const steps: CardItem[] = [
    {
        icon: "fa-solid fa-book-open",
        title: "1. 基础学习",
        body: "姿势、步伐、基本斩击与防御。",
    },
    {
        icon: "fa-solid fa-hand-fist",
        title: "2. 技术进阶",
        body: "战术思维、组合应用与距离控制。",
    },
    {
        icon: "fa-solid fa-shield-halved",
        title: "3. 对练实战",
        body: "情境训练、对练与历史情境还原。",
    },
    {
        icon: "fa-solid fa-award",
        title: "4. 持续精进",
        body: "参加课程、比赛与社群活动。",
    },
];

const gears: IconText[] = [
    { icon: "fa-solid fa-helmet-safety", label: "头部防护" },
    { icon: "fa-solid fa-hand-fist", label: "手部防护" },
    { icon: "fa-solid fa-shirt", label: "躯干防护" },
    { icon: "fa-solid fa-slash", label: "训练器械" },
];

const programs: ProgramItem[] = [
    {
        icon: "fa-solid fa-seedling",
        title: "新手体验课",
        body: "无基础也可以加入，认识 HEMA、安全规则和基础动作。",
        type: "beginner",
    },
    {
        icon: "fa-solid fa-person-running",
        title: "长剑基础班",
        body: "建立步伐、护位、斩击和基础攻防，适合稳定入门。",
        type: "beginner",
    },
    {
        icon: "fa-solid fa-chess-knight",
        title: "技术进阶班",
        body: "围绕距离、时机和组合技术，提升实战判断。",
        type: "advanced",
    },
    {
        icon: "fa-solid fa-shield-heart",
        title: "安全对练课",
        body: "在护具和规则下进行控制对练，建立节奏和反应。",
        type: "advanced",
    },
    {
        icon: "fa-solid fa-scroll",
        title: "史料研读",
        body: "结合历史剑术手稿，理解技术背后的身体逻辑。",
        type: "advanced",
    },
    {
        icon: "fa-solid fa-users",
        title: "社群训练日",
        body: "面向会员的开放训练、复盘和社群交流活动。",
        type: "all",
    },
];

const programFilters: Array<{ label: string; value: ProgramFilter }> = [
    { label: "全部", value: "all" },
    { label: "新手", value: "beginner" },
    { label: "进阶", value: "advanced" },
];

const assetUrls = {
    crest: crestUrl,
    equipment: equipmentUrl,
    galleryClass: galleryClassUrl,
    galleryGroup: galleryGroupUrl,
    gallerySparring: gallerySparringUrl,
    heroTraining: heroTrainingUrl,
};

const galleryItems: GalleryItem[] = [
    { src: assetUrls.galleryGroup, alt: "紫电剑社会员合影", title: "会员合影" },
    { src: assetUrls.galleryClass, alt: "新手课训练现场", title: "新手训练" },
    { src: assetUrls.gallerySparring, alt: "HEMA 对练现场", title: "安全对练" },
];

const trialFeatures: IconText[] = [
    { icon: "fa-regular fa-clock", label: "90 分钟体验" },
    { icon: "fa-solid fa-user-group", label: "小班教学" },
    { icon: "fa-solid fa-hand", label: "装备可租" },
    { icon: "fa-solid fa-id-card", label: "适合 16+" },
];

const faqs: FaqItem[] = [
    {
        question: "我没有基础，可以参加吗？",
        answer: "可以。体验课会从安全规则、握剑和基础步伐开始，教练会控制强度。",
    },
    {
        question: "训练需要自备装备吗？",
        answer: "第一次体验可租借基础装备，长期训练建议逐步配置个人护具。",
    },
    {
        question: "年龄有限制吗？",
        answer: "常规成人课程建议 16 岁以上参加，未成年人需要监护人确认。",
    },
    {
        question: "如何成为正式会员？",
        answer: "完成体验课后可选择月卡或季度会员，教练会建议适合的课程路线。",
    },
    {
        question: "课程如何收费？",
        answer: "体验课、月卡和会员课包价格不同，可在预约后由客服发送最新说明。",
    },
    {
        question: "训练地点在哪里？",
        answer: "页面展示为示例地址，正式上线前可替换为你的实际训练馆信息。",
    },
];

const bookingSlots = [
    "周三 19:00 长剑基础",
    "周六 14:00 对练与实战",
    "周日 10:00 新手入门课",
];

const galleryMessage = "完整图库可在后续版本接入相册或社交媒体。";

const isNavOpen = ref(false);
const activeProgramFilter = ref<ProgramFilter>("all");
const openedFaqs = ref(new Set<number>([0]));
const bookingDialog = ref<HTMLDialogElement | null>(null);
const toastMessage = ref("");
let toastTimer: number | undefined;

const bookingForm = reactive({
    name: "",
    contact: "",
    slot: "",
});

const visiblePrograms = computed(() => {
    return programs.filter((program) => {
        return activeProgramFilter.value === "all" ||
            program.type === activeProgramFilter.value ||
            program.type === "all";
    });
});

const trialBandStyle = computed(() => ({
    "--trial-watermark-image": `url("${assetUrls.crest}")`,
}));

/**
 * 展开或收起移动端导航。
 */
function toggleNav(): void {
    isNavOpen.value = !isNavOpen.value;
}

/**
 * 关闭移动端导航。
 */
function closeNav(): void {
    isNavOpen.value = false;
}

/**
 * 平滑滚动到指定页面区块。
 * @param selector 区块选择器。
 */
function scrollToSection(selector: string): void {
    try {
        document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
        logError("滚动到页面区块失败", error);
    }
}

/**
 * 打开预约弹窗。
 */
function openBookingDialog(): void {
    try {
        bookingDialog.value?.showModal();
        document.body.classList.add("is-locked");
    } catch (error) {
        logError("打开预约弹窗失败", error);
    }
}

/**
 * 关闭预约弹窗。
 */
function closeBookingDialog(): void {
    bookingDialog.value?.close();
    document.body.classList.remove("is-locked");
}

/**
 * 提交预约信息并展示反馈。
 */
function submitBooking(): void {
    logInfo("提交体验课预约", { slot: bookingForm.slot });
    bookingForm.name = "";
    bookingForm.contact = "";
    bookingForm.slot = "";
    closeBookingDialog();
    showToast("预约信息已记录，教练会尽快与你确认。");
}

/**
 * 展开或收起 FAQ 项。
 * @param index FAQ 序号。
 */
function toggleFaq(index: number): void {
    const nextFaqs = new Set(openedFaqs.value);
    if (nextFaqs.has(index)) {
        nextFaqs.delete(index);
    } else {
        nextFaqs.add(index);
    }
    openedFaqs.value = nextFaqs;
}

/**
 * 显示图库提示信息。
 * @param title 图库标题。
 */
function showGalleryToast(title: string): void {
    showToast(`${title}：可扩展为大图预览。`);
}

/**
 * 显示短提示信息。
 * @param message 提示内容。
 */
function showToast(message: string): void {
    toastMessage.value = message;
    if (toastTimer !== undefined) {
        window.clearTimeout(toastTimer);
    }
    toastTimer = window.setTimeout(() => {
        toastMessage.value = "";
    }, 2600);
}
</script>
