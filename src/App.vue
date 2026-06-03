<template>
    <SiteHeader
        :club-name="siteContent.clubName"
        :short-name="siteContent.shortName"
        :label="siteContent.label"
        :logo="siteContent.logo"
    />
    <main id="top">
        <HeroSection :hero="siteContent.hero" :stats="siteContent.stats" />
        <IntroSection :intro="siteContent.intro" />
        <ProgramsSection :programs="siteContent.programs" />
        <ScheduleSection :schedule="siteContent.schedule" />
        <ValuesSection :values="siteContent.values" />
        <JoinSection :join="siteContent.join" />
    </main>
    <SiteFooter :club-name="siteContent.clubName" />
</template>

<script setup>
import { siteContent } from './content/siteContent.js'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import IntroSection from './components/IntroSection.vue'
import ProgramsSection from './components/ProgramsSection.vue'
import ScheduleSection from './components/ScheduleSection.vue'
import ValuesSection from './components/ValuesSection.vue'
import JoinSection from './components/JoinSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>
