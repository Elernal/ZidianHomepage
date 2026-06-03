<template>
    <section class="section schedule-section" id="schedule" aria-labelledby="schedule-title">
        <div class="section-heading">
            <p class="eyebrow">Schedule</p>
            <h2 id="schedule-title">训练安排占位</h2>
        </div>
        <ul class="schedule-list">
            <li v-for="(item, i) in schedule" :key="i">
                <span class="schedule-day">{{ item.day }}</span>
                <span>{{ item.time }}</span>
                <strong>{{ item.type }}</strong>
                <em>{{ item.status }}</em>
            </li>
        </ul>
    </section>
</template>

<script setup>
defineProps({
    schedule: Array,
})
</script>

<style scoped>
.schedule-section {
    background:
        linear-gradient(90deg, rgba(155, 92, 255, 0.08), transparent),
        var(--bg-soft);
}

.schedule-list li {
    display: grid;
    grid-template-columns: 0.7fr 1fr 1fr auto;
    gap: 18px;
    align-items: center;
    min-height: 70px;
    padding: 18px 22px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.04);
}

.schedule-list span {
    color: var(--muted);
}

.schedule-day {
    color: var(--text) !important;
    font-weight: 900;
}

.schedule-list em {
    justify-self: end;
    color: var(--brass);
    font-size: 13px;
    font-style: normal;
    font-weight: 800;
}

@media (max-width: 900px) {
    .schedule-list li {
        grid-template-columns: 1fr;
        gap: 8px;
    }

    .schedule-list em {
        justify-self: start;
    }
}
</style>
