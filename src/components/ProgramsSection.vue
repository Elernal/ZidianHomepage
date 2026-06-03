<template>
    <section class="section programs-section" id="programs" aria-labelledby="program-title">
        <div class="section-heading">
            <p class="eyebrow">Training</p>
            <h2 id="program-title">从基础到对抗的训练路径</h2>
        </div>
        <div class="program-grid">
            <article v-for="(program, i) in programs" :key="i" class="program-card">
                <span>{{ program.meta }}</span>
                <h3>{{ program.title }}</h3>
                <p>{{ program.body }}</p>
            </article>
        </div>
    </section>
</template>

<script setup>
defineProps({
    programs: Array,
})
</script>

<style scoped>
.program-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
}

.program-card {
    min-height: 260px;
    padding: 26px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: var(--bg-panel);
}

.program-card span {
    display: inline-flex;
    margin-bottom: 36px;
    color: var(--green);
    font-size: 13px;
    font-weight: 800;
}

.program-card p {
    margin-bottom: 0;
    color: var(--muted);
    line-height: 1.72;
}

@media (max-width: 900px) {
    .program-card {
        min-height: auto;
    }
}
</style>
