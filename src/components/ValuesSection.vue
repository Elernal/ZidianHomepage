<template>
    <section class="section values-section" aria-labelledby="values-title">
        <div class="section-heading">
            <p class="eyebrow">Safety</p>
            <h2 id="values-title">安全、体系、真实反馈</h2>
        </div>
        <ul class="value-list">
            <li v-for="(value, i) in values" :key="i">{{ value }}</li>
        </ul>
    </section>
</template>

<script setup>
defineProps({
    values: Array,
})
</script>

<style scoped>
.value-list li {
    min-height: 92px;
    padding: 22px;
    border-left: 3px solid var(--violet);
    background: var(--bg-panel);
    color: var(--muted);
    line-height: 1.65;
}
</style>
