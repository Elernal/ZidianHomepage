<template>
    <section class="join-section" id="join" aria-labelledby="join-title">
        <div>
            <p class="eyebrow">Join Us</p>
            <h2 id="join-title">{{ join.title }}</h2>
            <p>{{ join.body }}</p>
        </div>
        <div class="join-panel">
            <span>{{ join.contact }}</span>
            <strong>{{ join.address }}</strong>
            <p>{{ join.note }}</p>
        </div>
    </section>
</template>

<script setup>
defineProps({
    join: Object,
})
</script>

<style scoped>
.join-section {
    display: grid;
    grid-template-columns: minmax(260px, 0.9fr) minmax(280px, 520px);
    gap: clamp(28px, 5vw, 72px);
    align-items: center;
    border-top: 1px solid var(--line);
    background:
        linear-gradient(135deg, rgba(123, 53, 255, 0.24), rgba(135, 179, 141, 0.08)),
        #111318;
}

.join-section h2 {
    margin-bottom: 20px;
}

.join-section p {
    max-width: 680px;
    color: var(--muted);
    font-size: 18px;
    line-height: 1.8;
}

.join-panel {
    display: grid;
    gap: 18px;
    min-height: 260px;
    padding: 28px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: rgba(12, 13, 16, 0.66);
    box-shadow: var(--shadow);
}

.join-panel span {
    display: grid;
    min-height: 120px;
    place-items: center;
    border: 1px dashed rgba(255, 255, 255, 0.28);
    border-radius: 6px;
    color: var(--brass);
    font-weight: 900;
}

.join-panel strong {
    font-size: 22px;
}

.join-panel p {
    margin-bottom: 0;
    font-size: 15px;
}

@media (max-width: 900px) {
    .join-section {
        grid-template-columns: 1fr;
    }
}
</style>
