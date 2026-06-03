<template>
    <footer class="site-footer">
        <span>{{ clubName }}</span>
        <span>HEMA · Longsword · Nanchang</span>
    </footer>
</template>

<script setup>
defineProps({
    clubName: String,
})
</script>

<style scoped>
.site-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 16px;
    padding: 28px clamp(20px, 5vw, 72px);
    border-top: 1px solid var(--line);
    color: var(--muted);
    background: #090a0d;
}
</style>
