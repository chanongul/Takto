<template>
  <HomeHero />

  <HomePromotion />

  <HomeCatalog />
</template>

<script setup lang="ts">
const params = computed(() => useRoute().params)
</script>
