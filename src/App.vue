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
    </header>

    <main v-if="isHomePage" id="top">
        <section class="hero" aria-labelledby="hero-title">
            <img
                class="hero-image"
                :src="assetUrls.heroTraining"
                alt="两名 HEMA 学员在现代训练馆中对练"
                loading="eager"
                decoding="async"
                fetchpriority="high"
            >
            <div class="hero-overlay"></div>
            <div class="hero-content section-shell">
                <div class="hero-copy">
                    <p class="eyebrow">历史剑术 · 现代训练</p>
                    <h1 id="hero-title">紫电剑社<br>HEMA 历史剑术</h1>
                    <p class="hero-subtitle">紫电青霜，王将军之武库。</p>
                    <div class="hero-points" aria-label="俱乐部特点">
                        <span v-for="point in heroPoints" :key="point.label">
                            <i :class="point.icon" aria-hidden="true"></i>
                            {{ point.label }}
                        </span>
                    </div>
                    <div class="hero-actions">
                        <a class="ghost-link" href="#schedule">
                            查看课表
                            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <section class="weekly-schedule section-shell" id="schedule" aria-labelledby="weekly-schedule-title">
            <div class="section-row">
                <div>
                    <p class="section-kicker">训练日程</p>
                    <h2 id="weekly-schedule-title">每周课表</h2>
                </div>
                <p class="schedule-note">课程按周循环，临时调整以教练通知为准。</p>
            </div>
            <div class="weekly-board" aria-label="紫电剑社每周课程表">
                <div class="weekly-corner" aria-hidden="true">
                    <i class="fa-regular fa-calendar" aria-hidden="true"></i>
                </div>
                <div
                    v-for="day in weeklyScheduleDays"
                    :key="day"
                    class="weekly-day"
                >
                    {{ day }}
                </div>
                <template v-for="time in weeklyScheduleTimes" :key="time">
                    <div class="weekly-time">{{ time }}</div>
                    <div
                        v-for="day in weeklyScheduleDays"
                        :key="`${time}-${day}`"
                        class="weekly-cell"
                        :class="{ 'has-course': weeklyScheduleMap[time][day] }"
                    >
                        <article
                            v-if="weeklyScheduleMap[time][day]"
                            class="weekly-course"
                            :class="weeklyScheduleMap[time][day]?.tone"
                        >
                            <div class="weekly-course-meta">
                                <span>{{ weeklyScheduleMap[time][day]?.coach }}</span>
                                <span>{{ weeklyScheduleMap[time][day]?.duration }}</span>
                            </div>
                            <h3>{{ weeklyScheduleMap[time][day]?.title }}</h3>
                            <div class="weekly-course-foot">
                                <span>{{ weeklyScheduleMap[time][day]?.format }}</span>
                            </div>
                        </article>
                    </div>
                </template>
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
            <div class="location-map">
                <button
                    class="location-map-preview"
                    type="button"
                    aria-label="放大查看南昌紫电剑社周边地图"
                    @click="openMapPreview"
                >
                    <img
                        :src="assetUrls.locationMap"
                        alt="南昌紫电剑社周边地图"
                        loading="lazy"
                        decoding="async"
                    >
                    <span>
                        <i class="fa-solid fa-magnifying-glass-plus" aria-hidden="true"></i>
                        点击放大地图
                    </span>
                </button>
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

        <section class="contact-qr section-shell" aria-labelledby="contact-qr-title">
            <div class="contact-qr-copy">
                <div>
                    <p class="section-kicker">联系预约</p>
                    <h2 id="contact-qr-title">扫码添加微信</h2>
                    <p>体验课报名、装备租借和最近开课时间，都可以直接联系确认。</p>
                </div>
                <article
                    v-for="method in contactMethods"
                    :key="method.title"
                    class="contact-method"
                >
                    <i :class="method.icon" aria-hidden="true"></i>
                    <div>
                        <strong>{{ method.title }}</strong>
                        <span>{{ method.body }}</span>
                    </div>
                </article>
            </div>
            <div class="contact-qr-grid" aria-label="微信联系二维码">
                <article
                    v-for="qr in contactQrCards"
                    :key="qr.title"
                    class="contact-qr-card"
                >
                    <div class="contact-qr-image">
                        <img :src="qr.src" :alt="qr.alt" loading="lazy">
                    </div>
                    <div>
                        <h3>{{ qr.title }}</h3>
                        <p>{{ qr.body }}</p>
                    </div>
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
                <a class="ghost-link dark" href="index.html#schedule">查看训练日程</a>
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

    <main v-else-if="isPricingPage" id="pricing-page" class="pricing-page">
        <section class="pricing section-shell" id="membership" aria-labelledby="pricing-title">
            <div class="pricing-notice-head">
                <img :src="assetUrls.crest" alt="紫电剑社社徽" loading="lazy">
                <div>
                    <p class="section-kicker">会员与费用</p>
                    <h1 id="pricing-title">收费价目表</h1>
                    <p>价格按当前公开价目整理，报名前可联系教练确认适合的卡种。</p>
                </div>
            </div>
            <div class="pricing-board" aria-label="紫电剑社收费价目表">
                <nav class="pricing-rail" aria-label="价目分类">
                    <a
                        v-for="group in pricingNoticeGroups"
                        :key="group.title"
                        :href="`#pricing-${group.slug}`"
                    >
                        <i :class="group.icon" aria-hidden="true"></i>
                        <span>{{ group.title }}</span>
                    </a>
                </nav>
                <div class="pricing-table">
                    <section
                        v-for="group in pricingNoticeGroups"
                        :id="`pricing-${group.slug}`"
                        :key="group.title"
                        class="pricing-table-group"
                    >
                        <h2>{{ group.title }}</h2>
                        <article
                            v-for="item in group.items"
                            :key="item.name"
                            class="pricing-table-row"
                        >
                            <div>
                                <strong>{{ item.name }}</strong>
                                <small v-if="item.note">{{ item.note }}</small>
                            </div>
                            <span>{{ item.price }}</span>
                        </article>
                    </section>
                </div>
                <aside class="pricing-advice" aria-label="卡种选择建议">
                    <article v-for="advice in pricingAdvice" :key="advice.title">
                        <i :class="advice.icon" aria-hidden="true"></i>
                        <div>
                            <h2>{{ advice.title }}</h2>
                            <p>{{ advice.body }}</p>
                        </div>
                    </article>
                    <p>报名前可联系教练确认适合的卡种。</p>
                </aside>
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
                    <p>紫电青霜，王将军之武库。</p>
                </div>
            </div>
            <div class="footer-links">
                <a href="index.html#schedule">课程训练</a>
                <a href="index.html#schedule">训练日程</a>
                <a href="pricing.html">加入我们</a>
            </div>
            <div class="footer-contact">
                <span>{{ clubLocation.address }}</span>
                <div class="socials" aria-label="社交媒体">
                    <a
                        href="https://space.bilibili.com/18721640"
                        aria-label="哔哩哔哩"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i class="fa-brands fa-bilibili"></i>
                    </a>
                </div>
            </div>
        </div>
    </footer>

    <dialog
        ref="galleryDialog"
        class="image-preview-dialog"
        aria-label="图片放大预览"
        @close="unlockPage"
        @click="closePreviewOnBackdrop"
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
            <img :src="selectedPreviewImage.src" :alt="selectedPreviewImage.alt">
        </div>
    </dialog>

    <div class="toast" :class="{ 'is-visible': toastMessage }" role="status" aria-live="polite">
        {{ toastMessage }}
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import coachWanZihaoUrl from "./assets/coach-wan-zihao.jpg";
import coachXieFeiyuUrl from "./assets/coach-xie-feiyu.jpg";
import coachZhuChengUrl from "./assets/coach-zhu-cheng.jpg";
import contactWechatIliaUrl from "./assets/contact-wechat-ilia.png";
import contactZidianWechatUrl from "./assets/contact-zidian-wechat.jpg";
import crestUrl from "./assets/crest-display.webp";
import equipmentFullKitUrl from "./assets/equipment-full-kit.jpg";
import equipmentHardProtectionUrl from "./assets/equipment-hard-protection.jpg";
import equipmentJacketUrl from "./assets/equipment-jacket.jpg";
import equipmentMaskUrl from "./assets/equipment-mask.jpg";
import equipmentShoesUrl from "./assets/equipment-shoes.jpg";
import equipmentUrl from "./assets/equipment.webp";
import galleryClassUrl from "./assets/gallery-class.webp";
import galleryGroupUrl from "./assets/gallery-group.webp";
import gallerySparringUrl from "./assets/gallery-sparring.webp";
import heroTrainingUrl from "./assets/hero-training-member-lineup.webp";
import locationMapUrl from "./assets/location-map.webp";
import memberGalleryBriefingUrl from "./assets/member-gallery-briefing.jpg";
import memberGalleryBoxingLineupUrl from "./assets/member-gallery-boxing-lineup.jpg";
import memberGalleryCircleUrl from "./assets/member-gallery-circle.jpg";
import memberGalleryDrillUrl from "./assets/member-gallery-drill.jpg";
import memberGalleryGroupArmorUrl from "./assets/member-gallery-group-armor.jpg";
import memberGalleryGroupFloorUrl from "./assets/member-gallery-group-floor.jpg";
import memberGalleryLineupUrl from "./assets/member-gallery-lineup.jpg";
import memberGalleryLineupPurpleUrl from "./assets/member-gallery-lineup-purple.jpg";
import memberGallerySparringUrl from "./assets/member-gallery-sparring.jpg";
import memberGallerySummerLineupUrl from "./assets/member-gallery-summer-lineup.jpg";
import { logError, logInfo } from "./utils/logger";

type GalleryCategory = "training" | "class" | "sparring" | "community" | "gear";
type ClassTime = "14:30" | "16:00" | "19:30";
type WeekDay = "周一" | "周二" | "周三" | "周四" | "周五" | "周六" | "周日";

interface NavItem {
    href: string;
    label: string;
}

interface IconText {
    icon: string;
    label: string;
}

interface WeeklyLesson {
    coach: string;
    title: string;
    duration: string;
    format: string;
    tone: string;
}

interface PricingItem {
    name: string;
    price: string;
    note?: string;
}

interface PricingNoticeGroup {
    slug: string;
    title: string;
    icon: string;
    items: PricingItem[];
}

interface PricingAdvice {
    icon: string;
    title: string;
    body: string;
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

interface PreviewImage {
    src: string;
    alt: string;
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

interface ContactQrCard {
    title: string;
    body: string;
    src: string;
    alt: string;
}

interface ContactMethod {
    icon: string;
    title: string;
    body: string;
}

interface ClubLocation {
    name: string;
    address: string;
    amapUrl: string;
}

const navItems: NavItem[] = [
    { href: "index.html#top", label: "首页" },
    { href: "equipment.html", label: "装备指南" },
    { href: "coaches.html", label: "教练团队" },
    { href: "gallery.html", label: "会员风采" },
    { href: "pricing.html", label: "会员与费用" },
];

const heroPoints: IconText[] = [
    { icon: "fa-solid fa-landmark", label: "历史传承" },
    { icon: "fa-solid fa-bullseye", label: "科学训练" },
    { icon: "fa-solid fa-shield-halved", label: "安全第一" },
    { icon: "fa-solid fa-people-group", label: "社区友好" },
];

const weeklyScheduleDays: WeekDay[] = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const weeklyScheduleTimes: ClassTime[] = ["14:30", "16:00", "19:30"];
const weeklyScheduleMap: Record<ClassTime, Partial<Record<WeekDay, WeeklyLesson>>> = {
    "14:30": {
        周六: {
            coach: "飞鱼",
            title: "军刀课",
            duration: "60min",
            format: "团课",
            tone: "tone-gold",
        },
        周日: {
            coach: "卢主任",
            title: "长剑课",
            duration: "60min",
            format: "团课",
            tone: "tone-blue",
        },
    },
    "16:00": {
        周日: {
            coach: "卢主任",
            title: "徒手战斗",
            duration: "45min",
            format: "团课",
            tone: "tone-lavender",
        },
    },
    "19:30": {
        周二: {
            coach: "卢主任",
            title: "迅捷剑",
            duration: "60min",
            format: "团课",
            tone: "tone-coral",
        },
        周三: {
            coach: "万子豪",
            title: "长剑新手课",
            duration: "60min",
            format: "团课",
            tone: "tone-orange",
        },
        周四: {
            coach: "飞鱼",
            title: "古典花剑",
            duration: "60min",
            format: "团课",
            tone: "tone-magenta",
        },
        周五: {
            coach: "万子豪",
            title: "实战课",
            duration: "120min",
            format: "团课",
            tone: "tone-bronze",
        },
    },
};

const pricingNoticeGroups: PricingNoticeGroup[] = [
    {
        slug: "trial",
        title: "体验与次卡",
        icon: "fa-solid fa-ticket",
        items: [
            { name: "体验卡", price: "100元/次" },
            { name: "单次卡", price: "75元/90分钟" },
            { name: "五次卡", price: "335元" },
            { name: "十次卡", price: "649元" },
        ],
    },
    {
        slug: "private",
        title: "私教",
        icon: "fa-solid fa-user-check",
        items: [
            { name: "私教课/小课", price: "200元/节" },
        ],
    },
    {
        slug: "membership",
        title: "月卡/季卡/年卡",
        icon: "fa-regular fa-calendar-days",
        items: [
            { name: "学生折扣月卡", price: "399元" },
            { name: "月卡", price: "439元" },
            { name: "学生折扣季卡", price: "858元" },
            { name: "季卡", price: "958元" },
            { name: "学生折扣年卡", price: "3188元" },
            { name: "年卡", price: "3588元" },
        ],
    },
    {
        slug: "rental",
        title: "租用",
        icon: "fa-solid fa-box-archive",
        items: [
            {
                name: "租用储物柜",
                price: "70元/月",
                note: "三种次卡用户在储物柜有空余情况下可租用",
            },
            { name: "租用公用护具", price: "35元/次" },
        ],
    },
];

const pricingAdvice: PricingAdvice[] = [
    {
        icon: "fa-solid fa-user",
        title: "适合体验",
        body: "体验与单次/次卡，灵活选择，先体验再决定。",
    },
    {
        icon: "fa-solid fa-chart-line",
        title: "适合稳定训练",
        body: "月卡与季卡，保持训练节奏，持续提升。",
    },
    {
        icon: "fa-solid fa-shield-halved",
        title: "适合长期训练",
        body: "年卡更划算，长期投入，收获更大。",
    },
];

const assetUrls = {
    contactWechatIlia: contactWechatIliaUrl,
    contactZidianWechat: contactZidianWechatUrl,
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
    memberGalleryBoxingLineup: memberGalleryBoxingLineupUrl,
    memberGalleryCircle: memberGalleryCircleUrl,
    memberGalleryDrill: memberGalleryDrillUrl,
    memberGalleryGroupArmor: memberGalleryGroupArmorUrl,
    memberGalleryGroupFloor: memberGalleryGroupFloorUrl,
    memberGalleryLineup: memberGalleryLineupUrl,
    memberGalleryLineupPurple: memberGalleryLineupPurpleUrl,
    memberGallerySparring: memberGallerySparringUrl,
    memberGallerySummerLineup: memberGallerySummerLineupUrl,
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
    {
        src: assetUrls.memberGalleryLineupPurple,
        alt: "紫电剑社会员持剑横排合影",
        title: "持剑合影",
        category: "community",
        description: "会员在训练馆墙旗前持剑合影，记录日常训练后的集体时刻。",
        meta: "会员合影",
        layout: "is-wide",
    },
    {
        src: assetUrls.memberGalleryBoxingLineup,
        alt: "紫电剑社会员混合训练合影",
        title: "混合训练合影",
        category: "community",
        description: "不同训练方向的会员课后合影，展示剑术与徒手训练的多样性。",
        meta: "会员合影",
        layout: "is-wide",
    },
    {
        src: assetUrls.memberGallerySummerLineup,
        alt: "紫电剑社会员夏季训练合影",
        title: "夏季训练合影",
        category: "community",
        description: "夏季训练后的会员合影，保留训练场景和社群记录。",
        meta: "会员合影",
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

const contactMethods: ContactMethod[] = [
    {
        icon: "fa-solid fa-phone",
        title: "电话预约",
        body: "预约体验联系卢主任 18007920723",
    },
    {
        icon: "fa-brands fa-weixin",
        title: "微信咨询",
        body: "扫码添加微信，确认体验课时间",
    },
];

const contactQrCards: ContactQrCard[] = [
    {
        title: "微信联系",
        body: "适合直接咨询体验课、装备和到场安排。",
        src: assetUrls.contactWechatIlia,
        alt: "Ilia 微信二维码原图",
    },
    {
        title: "南昌紫电剑社",
        body: "剑社微信二维码，适合关注社群和后续训练信息。",
        src: assetUrls.contactZidianWechat,
        alt: "南昌紫电剑社微信二维码原图",
    },
];

const isNavOpen = ref(false);
const selectedGalleryIndex = ref(0);
const galleryDialog = ref<HTMLDialogElement | null>(null);
const toastMessage = ref("");
let toastTimer: number | undefined;

const featuredGalleryItems = computed(() => {
    return galleryItems.slice(0, 3);
});

const selectedPreviewImage = ref<PreviewImage>({
    src: galleryItems[0].src,
    alt: galleryItems[0].alt,
});

const isCoachesPage = computed(() => window.location.pathname.endsWith("/coaches.html"));
const isEquipmentPage = computed(() => window.location.pathname.endsWith("/equipment.html"));
const isMemberGalleryPage = computed(() => window.location.pathname.endsWith("/gallery.html"));
const isPricingPage = computed(() => window.location.pathname.endsWith("/pricing.html"));
const isHomePage = computed(() => {
    return !isCoachesPage.value &&
        !isEquipmentPage.value &&
        !isMemberGalleryPage.value &&
        !isPricingPage.value;
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
    if (isPricingPage.value) {
        return "pricing.html";
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
        selectedPreviewImage.value = {
            src: galleryItems[selectedGalleryIndex.value].src,
            alt: galleryItems[selectedGalleryIndex.value].alt,
        };
        galleryDialog.value?.showModal();
        lockPage();
        logInfo("打开图片放大预览", { index: selectedGalleryIndex.value });
    } catch (error) {
        logError("打开图片放大预览失败", error);
    }
}

/**
 * 打开地图放大预览。
 */
function openMapPreview(): void {
    try {
        selectedPreviewImage.value = {
            src: assetUrls.locationMap,
            alt: "南昌紫电剑社周边地图",
        };
        galleryDialog.value?.showModal();
        lockPage();
        logInfo("打开地图放大预览");
    } catch (error) {
        logError("打开地图放大预览失败", error);
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
 * 点击预览遮罩时关闭图片放大层。
 * @param event 鼠标点击事件。
 */
function closePreviewOnBackdrop(event: MouseEvent): void {
    if (event.target === galleryDialog.value) {
        closeGalleryDialog();
    }
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
