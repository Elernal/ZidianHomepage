<template>
    <header class="site-header" aria-label="站点导航">
        <a class="brand" href="#top" :aria-label="clubName">
            <img
                class="brand-mark"
                :src="logo"
                alt=""
                loading="eager"
                decoding="async"
            />
            <span>
                <strong>{{ shortName }}</strong>
                <small>{{ label }}</small>
            </span>
        </a>
        <nav aria-label="主页导航">
            <a href="#programs">训练</a>
            <a href="#schedule">安排</a>
            <a href="#join">加入</a>
        </nav>
    </header>
</template>

<script setup>
defineProps({
    clubName: String,
    shortName: String,
    label: String,
    logo: String,
})
</script>

<style scoped>
.site-header {
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 18px clamp(20px, 5vw, 72px);
    background: rgba(12, 13, 16, 0.78);
    border-bottom: 1px solid var(--line);
    backdrop-filter: blur(18px);
}

.brand {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
}

.brand-mark {
    width: 44px;
    height: 44px;
    flex: 0 0 auto;
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: 8px;
    background: #ffffff;
    object-fit: cover;
    object-position: center;
}

.brand strong,
.brand small {
    display: block;
}

.brand strong {
    font-size: 16px;
    line-height: 1.2;
}

.brand small {
    margin-top: 2px;
    color: var(--muted);
    font-size: 11px;
    line-height: 1.2;
    text-transform: uppercase;
}

.site-header nav {
    display: flex;
    gap: 6px;
    align-items: center;
}

.site-header nav a {
    min-width: 54px;
    padding: 9px 12px;
    border-radius: 6px;
    color: var(--muted);
    font-size: 14px;
    text-align: center;
}

.site-header nav a:hover,
.site-header nav a:focus-visible {
    color: var(--text);
    background: rgba(255, 255, 255, 0.08);
    outline: none;
}

@media (max-width: 900px) {
    .site-header {
        padding: 14px 18px;
    }

    .brand small {
        display: none;
    }
}

@media (max-width: 560px) {
    .site-header nav a {
        min-width: 42px;
        padding-inline: 8px;
    }

    .brand-mark {
        width: 40px;
        height: 40px;
    }
}
</style>
