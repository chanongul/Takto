<template>
  <div v-if="!loading">
    <Navbar />
    <slot />
    <Footer />
  </div>
  <p v-else>Loading...</p>
</template>

<script setup lang="ts">
const { loading } = useLoadingStore()
</script>
