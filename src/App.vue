<template>
    <header class="site-header" :class="{ 'is-open': isNavOpen }">
        <a class="brand" href="index.html#top" aria-label="返回首页" @click="closeNav">
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
                :class="{ 'is-active': item.href === activeNavHref }"
                @click="closeNav"
            >
                {{ item.label }}
            </a>
        </nav>
        <button class="header-cta" type="button" @click="openBookingDialog">
            预约体验课
        </button>
    </header>

    <main v-if="isHomePage" id="top">
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
                        {{ clubLocation.address }}
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
                <a class="text-button" href="gallery.html">
                    查看更多照片
                    <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </a>
            </div>
            <div class="gallery-grid">
                <figure
                    v-for="(item, index) in featuredGalleryItems"
                    :key="item.title"
                    class="gallery-item"
                >
                    <img :src="item.src" :alt="item.alt" loading="lazy">
                    <button type="button" @click="openGalleryDialog(index)">
                        <span class="gallery-caption">
                            <strong>{{ item.title }}</strong>
                            <small>{{ item.meta }}</small>
                        </span>
                    </button>
                </figure>
            </div>
        </section>

        <section class="location section-shell" id="location" aria-labelledby="location-title">
            <div class="location-map" aria-hidden="true">
                <img
                    :src="assetUrls.locationMap"
                    alt=""
                    loading="lazy"
                >
            </div>
            <div class="location-card">
                <p class="section-kicker">训练地点</p>
                <h2 id="location-title">{{ clubLocation.name }}</h2>
                <address>
                    <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
                    {{ clubLocation.address }}
                </address>
                <div class="location-actions">
                    <button class="gold-button" type="button" @click="copyLocationAddress">
                        复制地址
                        <i class="fa-regular fa-copy" aria-hidden="true"></i>
                    </button>
                    <a
                        class="ghost-link dark"
                        :href="clubLocation.amapUrl"
                        target="_blank"
                        rel="noreferrer"
                    >
                        高德地图导航
                        <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                    </a>
                </div>
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

    <main v-else-if="isCoachesPage" id="coaches-page" class="coach-page">
        <section class="coaches section-shell" id="coaches" aria-labelledby="coaches-title">
            <div class="coach-intro">
                <div>
                    <p class="section-kicker">教练团队</p>
                    <h1 id="coaches-title">选择你的第一位教练</h1>
                </div>
                <p>
                    三位教练覆盖军刀、古典花剑、迅捷剑、长剑和徒手战斗。
                    页面以照片和完整履历并列呈现，便于新学员快速判断课程方向。
                </p>
            </div>
            <div class="coach-grid">
                <article
                    v-for="coach in coachProfiles"
                    :key="coach.name"
                    class="coach-card"
                >
                    <div class="coach-photo">
                        <img
                            :src="coach.photo"
                            :alt="coach.name"
                            loading="lazy"
                        >
                    </div>
                    <div class="coach-copy">
                        <h2>{{ coach.lines[0] }}</h2>
                        <strong>{{ coach.lines[1] }}</strong>
                        <p
                            v-for="line in coach.lines.slice(2)"
                            :key="line"
                        >
                            {{ line }}
                        </p>
                    </div>
                </article>
            </div>
            <div class="coach-page-actions">
                <a class="ghost-link dark" href="index.html#programs">查看课程体系</a>
                <button class="gold-button" type="button" @click="openBookingDialog">
                    预约体验课
                    <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </button>
            </div>
        </section>
    </main>

    <main v-else-if="isMemberGalleryPage" id="member-gallery-page" class="member-gallery-page">
        <section
            class="member-gallery-shell section-shell"
            aria-labelledby="member-gallery-title"
        >
            <div class="member-gallery-intro">
                <img
                    class="member-gallery-watermark"
                    :src="assetUrls.crest"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                >
                <div>
                    <h1 id="member-gallery-title">会员风采</h1>
                    <p>全部照片合集</p>
                </div>
                <span>
                    <i class="fa-solid fa-magnifying-glass-plus" aria-hidden="true"></i>
                    {{ galleryItems.length }} 张现场记录
                </span>
            </div>

            <div class="member-photo-wall" aria-label="紫电剑社会员照片合集">
                <figure
                    v-for="(item, index) in galleryItems"
                    :key="item.title"
                    class="member-photo-tile"
                    :class="item.layout"
                >
                    <img :src="item.src" :alt="item.alt" loading="lazy">
                    <button
                        type="button"
                        :aria-label="`打开${item.title}大图`"
                        @click="openGalleryDialog(index)"
                    >
                        <i class="fa-solid fa-magnifying-glass-plus" aria-hidden="true"></i>
                    </button>
                </figure>
            </div>
        </section>
    </main>

    <main v-else id="equipment-page" class="equipment-page">
        <section
            class="equipment-guide section-shell"
            aria-labelledby="equipment-title"
        >
            <aside class="equipment-rail">
                <p class="section-kicker">常见装备</p>
                <h1 id="equipment-title">按训练阶段理解装备</h1>
                <p>
                    新手不需要一次买齐所有护具。这个页面按体验课、基础课、
                    进阶对练三步说明，降低第一次报名时的心理成本。
                </p>
                <span>适合放在装备指南页首屏</span>
            </aside>

            <section class="equipment-stages" aria-label="装备阶段说明">
                <article class="equipment-stage is-featured">
                    <div class="equipment-stage-photo">
                        <img
                            :src="assetUrls.equipmentFullKit"
                            alt="学员穿戴基础护具进行训练"
                        >
                    </div>
                    <div class="equipment-stage-copy">
                        <span>阶段 01</span>
                        <h2>体验课：先穿基础护具</h2>
                        <p>
                            面罩、手套和基础防护可由俱乐部协助安排，
                            学员先专注动作和安全规则。
                        </p>
                    </div>
                </article>

                <article
                    v-for="item in equipmentStages"
                    :key="item.title"
                    class="equipment-stage"
                >
                    <div class="equipment-stage-photo">
                        <img :src="item.photo" :alt="item.alt" loading="lazy">
                    </div>
                    <div class="equipment-stage-copy">
                        <span>{{ item.tag }}</span>
                        <h2>{{ item.title }}</h2>
                        <p>{{ item.body }}</p>
                    </div>
                </article>
            </section>
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
                <a href="index.html#about">关于我们</a>
                <a href="index.html#programs">课程训练</a>
                <a href="index.html#schedule">训练日程</a>
                <a href="index.html#membership">加入我们</a>
            </div>
            <div class="footer-contact">
                <span>{{ clubLocation.address }}</span>
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

    <dialog
        ref="galleryDialog"
        class="image-preview-dialog"
        aria-label="图片放大预览"
        @close="unlockPage"
    >
        <div class="image-preview-viewer">
            <button
                class="dialog-close"
                type="button"
                aria-label="关闭图片预览"
                @click="closeGalleryDialog"
            >
                <i class="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
            <img :src="selectedGalleryItem.src" :alt="selectedGalleryItem.alt">
        </div>
    </dialog>

    <div class="toast" :class="{ 'is-visible': toastMessage }" role="status" aria-live="polite">
        {{ toastMessage }}
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";

import coachWanZihaoUrl from "./assets/coach-wan-zihao.jpg";
import coachXieFeiyuUrl from "./assets/coach-xie-feiyu.jpg";
import coachZhuChengUrl from "./assets/coach-zhu-cheng.jpg";
import crestUrl from "./assets/crest.png";
import equipmentFullKitUrl from "./assets/equipment-full-kit.jpg";
import equipmentHardProtectionUrl from "./assets/equipment-hard-protection.jpg";
import equipmentJacketUrl from "./assets/equipment-jacket.jpg";
import equipmentMaskUrl from "./assets/equipment-mask.jpg";
import equipmentShoesUrl from "./assets/equipment-shoes.jpg";
import equipmentUrl from "./assets/equipment.png";
import galleryClassUrl from "./assets/gallery-class.png";
import galleryGroupUrl from "./assets/gallery-group.png";
import gallerySparringUrl from "./assets/gallery-sparring.png";
import heroTrainingUrl from "./assets/hero-training.png";
import locationMapUrl from "./assets/location-map.png";
import memberGalleryBriefingUrl from "./assets/member-gallery-briefing.jpg";
import memberGalleryCircleUrl from "./assets/member-gallery-circle.jpg";
import memberGalleryDrillUrl from "./assets/member-gallery-drill.jpg";
import memberGalleryGroupArmorUrl from "./assets/member-gallery-group-armor.jpg";
import memberGalleryGroupFloorUrl from "./assets/member-gallery-group-floor.jpg";
import memberGalleryLineupUrl from "./assets/member-gallery-lineup.jpg";
import memberGallerySparringUrl from "./assets/member-gallery-sparring.jpg";
import { logError, logInfo } from "./utils/logger";

type ProgramFilter = "all" | "beginner" | "advanced";
type GalleryCategory = "training" | "class" | "sparring" | "community" | "gear";

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
    category: GalleryCategory;
    description: string;
    meta: string;
    layout: string;
}

interface CoachProfile {
    name: string;
    photo: string;
    lines: string[];
}

interface EquipmentStage {
    tag: string;
    title: string;
    body: string;
    photo: string;
    alt: string;
}

interface FaqItem {
    question: string;
    answer: string;
}

interface ClubLocation {
    name: string;
    address: string;
    amapUrl: string;
}

const navItems: NavItem[] = [
    { href: "index.html#top", label: "首页" },
    { href: "index.html#about", label: "关于我们" },
    { href: "index.html#programs", label: "课程体系" },
    { href: "index.html#schedule", label: "训练日程" },
    { href: "gallery.html", label: "会员风采" },
    { href: "coaches.html", label: "教练团队" },
    { href: "equipment.html", label: "装备指南" },
    { href: "index.html#membership", label: "会员与费用" },
    { href: "index.html#contact", label: "联系我们" },
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
    equipmentFullKit: equipmentFullKitUrl,
    equipmentHardProtection: equipmentHardProtectionUrl,
    equipmentJacket: equipmentJacketUrl,
    equipmentMask: equipmentMaskUrl,
    equipmentShoes: equipmentShoesUrl,
    galleryClass: galleryClassUrl,
    galleryGroup: galleryGroupUrl,
    gallerySparring: gallerySparringUrl,
    heroTraining: heroTrainingUrl,
    locationMap: locationMapUrl,
    memberGalleryBriefing: memberGalleryBriefingUrl,
    memberGalleryCircle: memberGalleryCircleUrl,
    memberGalleryDrill: memberGalleryDrillUrl,
    memberGalleryGroupArmor: memberGalleryGroupArmorUrl,
    memberGalleryGroupFloor: memberGalleryGroupFloorUrl,
    memberGalleryLineup: memberGalleryLineupUrl,
    memberGallerySparring: memberGallerySparringUrl,
};

const clubLocation: ClubLocation = {
    name: "南昌紫电剑社",
    address: "南昌市新建区黄家湖西路198号南昌紫电剑社",
    amapUrl: [
        "https://uri.amap.com/search?keyword=",
        "%E5%8D%97%E6%98%8C%E5%B8%82%E6%96%B0%E5%BB%BA%E5%8C%BA",
        "%E9%BB%84%E5%AE%B6%E6%B9%96%E8%A5%BF%E8%B7%AF198%E5%8F%B7",
        "%E5%8D%97%E6%98%8C%E7%B4%AB%E7%94%B5%E5%89%91%E7%A4%BE",
    ].join(""),
};

const galleryItems: GalleryItem[] = [
    {
        src: assetUrls.memberGalleryBriefing,
        alt: "紫电剑社课堂讲解现场",
        title: "课堂讲解",
        category: "class",
        description: "教练在训练场中讲解动作要点，学员围绕场地进行观察与练习。",
        meta: "训练现场",
        layout: "is-lead",
    },
    {
        src: assetUrls.memberGalleryGroupArmor,
        alt: "紫电剑社会员穿戴护具合影",
        title: "护具合影",
        category: "community",
        description: "课后学员合影，记录训练后的交流与社群氛围。",
        meta: "会员合影",
        layout: "is-wide",
    },
    {
        src: assetUrls.memberGalleryLineup,
        alt: "紫电剑社会员持剑列队合影",
        title: "列队合影",
        category: "community",
        description: "会员在训练馆中持剑合影，墙面旗帜和器械展示出俱乐部空间。",
        meta: "会员合影",
        layout: "is-standard",
    },
    {
        src: assetUrls.memberGallerySparring,
        alt: "紫电剑社安全对练瞬间",
        title: "对练瞬间",
        category: "sparring",
        description: "学员在安全规则下进行控制对练，练习距离、时机和反应。",
        meta: "对练瞬间",
        layout: "is-standard",
    },
    {
        src: assetUrls.memberGalleryGroupFloor,
        alt: "紫电剑社会员在训练垫前合影",
        title: "训练合影",
        category: "community",
        description: "训练场地与会员合影，呈现日常训练的真实氛围。",
        meta: "会员合影",
        layout: "is-wide",
    },
    {
        src: assetUrls.memberGalleryDrill,
        alt: "紫电剑社课堂步法练习",
        title: "步法练习",
        category: "training",
        description: "训练中通过软兵器和步伐练习建立距离感与移动节奏。",
        meta: "训练现场",
        layout: "is-standard",
    },
    {
        src: assetUrls.memberGalleryCircle,
        alt: "紫电剑社围圈训练现场",
        title: "围圈训练",
        category: "training",
        description: "学员围绕训练区进行课堂练习，逐步熟悉动作路线与安全空间。",
        meta: "训练现场",
        layout: "is-wide",
    },
];

const equipmentStages: EquipmentStage[] = [
    {
        tag: "头部",
        title: "面罩",
        body: "任何对练前都需要确认尺寸和固定状态。",
        photo: assetUrls.equipmentMask,
        alt: "击剑面罩",
    },
    {
        tag: "身体",
        title: "防护服",
        body: "进入稳定训练后逐步配置，提升躯干保护。",
        photo: assetUrls.equipmentJacket,
        alt: "HEMA 防护服",
    },
    {
        tag: "关节",
        title: "硬质护具",
        body: "护肘、护膝、护小臂用于更高强度对抗。",
        photo: assetUrls.equipmentHardProtection,
        alt: "硬质护具",
    },
    {
        tag: "脚步",
        title: "训练鞋",
        body: "稳定、防滑，适合频繁启动和变向。",
        photo: assetUrls.equipmentShoes,
        alt: "训练鞋",
    },
];

const coachProfiles: CoachProfile[] = [
    {
        name: "谢飞宇",
        photo: coachXieFeiyuUrl,
        lines: [
            "谢飞宇，军刀、古典花剑教练",
            "2020年练习HEMA至今",
            [
                "主修古典意大利击剑系统，曾于美国RASP（Rapier and Saber Pedagogy）",
                "以及FMCP（Fencing Master Certificate Program）接受过系统性学习并",
                "取得认定证书，目前主要教学古典&现代击剑的混合系统。",
            ].join(""),
            "曾获",
            "2023 Brass Frog AoA 最佳技评奖",
            "2023 Revolution Rumble Tier C 长剑亚军",
            "2024 深圳期祈杯 迅捷剑季军",
        ],
    },
    {
        name: "朱铖",
        photo: coachZhuChengUrl,
        lines: [
            "朱铖，迅捷剑、长剑、徒手战斗教练",
            "2020年练习HEMA至今",
            "期间游历各地学习过多种武术系统",
            "曾获",
            "2023年天一杯军刀亚军",
            "2023年武穆杯迅捷剑冠军",
            "2023年嘉禾杯军刀冠军 长剑亚军",
            "2024年武穆杯军刀亚军",
            "2024年珠江杯长剑亚军",
            "2025年皇带鱼杯长剑季军 迅捷剑冠军",
            "2025年江西省武术搏击联赛散打70kg亚军",
            "2026年期祈杯迅捷剑冠军",
            "2026年全国国防体育运动赛短兵75kg冠军",
        ],
    },
    {
        name: "万子豪",
        photo: coachWanZihaoUrl,
        lines: [
            "万子豪，长剑教练",
            "2024年练习HEMA至今",
            "2025年长沙高校赛亚军",
            "2025年半世剑第肆杯全国公开赛双手刀剑组冠军",
            "2025年半世剑第肆杯全国公开赛新人双手组冠军",
            "2025年半世剑第肆杯全国公开赛团队赛亚军",
            "2026年全国国防体育运动赛短兵65kg亚军",
            "2026年全国国防体育运动赛军事搏击65kg亚军",
        ],
    },
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

const isNavOpen = ref(false);
const activeProgramFilter = ref<ProgramFilter>("all");
const selectedGalleryIndex = ref(0);
const openedFaqs = ref(new Set<number>([0]));
const bookingDialog = ref<HTMLDialogElement | null>(null);
const galleryDialog = ref<HTMLDialogElement | null>(null);
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

const featuredGalleryItems = computed(() => {
    return galleryItems.slice(0, 3);
});

const selectedGalleryItem = computed(() => {
    return galleryItems[selectedGalleryIndex.value] ?? galleryItems[0];
});

const trialBandStyle = computed(() => ({
    "--trial-watermark-image": `url("${assetUrls.crest}")`,
}));

const isCoachesPage = computed(() => window.location.pathname.endsWith("/coaches.html"));
const isEquipmentPage = computed(() => window.location.pathname.endsWith("/equipment.html"));
const isMemberGalleryPage = computed(() => window.location.pathname.endsWith("/gallery.html"));
const isHomePage = computed(() => {
    return !isCoachesPage.value && !isEquipmentPage.value && !isMemberGalleryPage.value;
});
const activeNavHref = computed(() => {
    if (isMemberGalleryPage.value) {
        return "gallery.html";
    }
    if (isCoachesPage.value) {
        return "coaches.html";
    }
    if (isEquipmentPage.value) {
        return "equipment.html";
    }
    return "index.html#top";
});

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
 * 锁定页面滚动。
 */
function lockPage(): void {
    document.body.classList.add("is-locked");
}

/**
 * 解除页面滚动锁定。
 */
function unlockPage(): void {
    document.body.classList.remove("is-locked");
}

/**
 * 打开预约弹窗。
 */
function openBookingDialog(): void {
    try {
        bookingDialog.value?.showModal();
        lockPage();
    } catch (error) {
        logError("打开预约弹窗失败", error);
    }
}

/**
 * 关闭预约弹窗。
 */
function closeBookingDialog(): void {
    bookingDialog.value?.close();
    unlockPage();
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
 * 复制训练地点地址，方便用户粘贴到常用地图应用。
 */
async function copyLocationAddress(): Promise<void> {
    try {
        await navigator.clipboard.writeText(clubLocation.address);
        logInfo("复制训练地址", { address: clubLocation.address });
        showToast("地址已复制。");
    } catch (error) {
        logError("复制训练地址失败", error);
        showToast("复制失败，请手动选择地址。");
    }
}

/**
 * 打开图片放大预览并定位到指定图片。
 * @param index 需要展示的图片序号。
 */
function openGalleryDialog(index = 0): void {
    try {
        selectedGalleryIndex.value = Math.max(0, Math.min(index, galleryItems.length - 1));
        galleryDialog.value?.showModal();
        lockPage();
        logInfo("打开图片放大预览", { index: selectedGalleryIndex.value });
    } catch (error) {
        logError("打开图片放大预览失败", error);
    }
}

/**
 * 关闭图片放大预览。
 */
function closeGalleryDialog(): void {
    galleryDialog.value?.close();
    unlockPage();
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
