<template>
    <section class="hero-section" aria-labelledby="hero-title">
        <div
            class="hero-media"
            :class="{
                'is-loaded': mediaState === 'loaded',
                'is-fallback': mediaState === 'fallback',
            }"
            :style="mediaState === 'loaded' ? { '--hero-image': `url('${hero.image}')` } : {}"
        ></div>
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <p class="eyebrow">{{ hero.kicker }}</p>
            <h1 id="hero-title">{{ hero.title }}</h1>
            <p class="hero-summary">{{ hero.summary }}</p>
            <div class="hero-actions">
                <a class="button button-primary" href="#join">
                    {{ hero.primaryAction }}
                </a>
                <a class="button button-secondary" href="#schedule">
                    {{ hero.secondaryAction }}
                </a>
            </div>
            <ul class="stats" aria-label="俱乐部亮点">
                <li v-for="(item, i) in stats" :key="i">
                    <strong>{{ item.value }}</strong>
                    <span>{{ item.label }}</span>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup>
import { useHeroImage } from '../composables/useHeroImage.js'

const props = defineProps({
    hero: Object,
    stats: Array,
})

const { mediaState } = useHeroImage(props.hero.image)
</script>

<style scoped>
.hero-section {
    position: relative;
    display: grid;
    min-height: 92vh;
    padding: 148px clamp(20px, 5vw, 72px) 72px;
    align-items: center;
}

.hero-media,
.hero-overlay {
    position: absolute;
    inset: 0;
}

.hero-media {
    background:
        radial-gradient(circle at 72% 35%, rgba(155, 92, 255, 0.2), transparent 34%),
        linear-gradient(120deg, #101116 0%, #1b1e25 52%, #252833 100%);
}

.hero-media.is-loaded {
    background-image:
        linear-gradient(90deg, rgba(8, 9, 12, 0.92), rgba(8, 9, 12, 0.28)),
        var(--hero-image);
    background-position: center;
    background-size: cover;
}

.hero-media.is-fallback {
    background:
        radial-gradient(circle at 68% 38%, rgba(155, 92, 255, 0.28), transparent 30%),
        linear-gradient(125deg, #0b0c10 0%, #1a1d24 54%, #31313a 100%);
}

.hero-overlay {
    background:
        linear-gradient(180deg, rgba(12, 13, 16, 0.05), rgba(12, 13, 16, 0.82)),
        linear-gradient(90deg, rgba(12, 13, 16, 0.82), transparent 64%);
}

.hero-content {
    position: relative;
    z-index: 1;
    width: min(680px, 100%);
}

.hero-summary {
    max-width: 560px;
    margin-bottom: 32px;
    color: var(--muted);
    font-size: 18px;
    line-height: 1.75;
}

.hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-bottom: 52px;
}

@media (max-width: 900px) {
    .hero-section {
        min-height: 88vh;
        padding: 124px 20px 46px;
    }

    .hero-media.is-loaded {
        background-position: 62% center;
    }

    .hero-overlay {
        background:
            linear-gradient(180deg, rgba(12, 13, 16, 0.22), rgba(12, 13, 16, 0.9)),
            linear-gradient(90deg, rgba(12, 13, 16, 0.82), rgba(12, 13, 16, 0.26));
    }

    .hero-summary {
        font-size: 16px;
    }
}
</style>
