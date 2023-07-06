<template>
  <div class="">Search result for {{ key }}</div>
</template>

<script setup lang="ts">
const query = computed(() => useRoute().query)
const key = ref<string>(query.value.q?.toString() || '')

watch(
  () => query.value.q,
  (val) => {
    key.value = val as string
  }
)
</script>
