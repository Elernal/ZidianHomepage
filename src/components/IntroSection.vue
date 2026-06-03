<template>
    <section class="section intro-section" aria-labelledby="intro-title">
        <div class="section-heading">
            <p class="eyebrow">Club Focus</p>
            <h2 id="intro-title">{{ intro.title }}</h2>
        </div>
        <p class="section-copy">{{ intro.body }}</p>
    </section>
</template>

<script setup>
defineProps({
    intro: Object,
})
</script>

<style scoped>
.intro-section {
    background: var(--bg-soft);
}
</style>
