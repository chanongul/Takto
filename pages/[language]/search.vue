<template>
  <div class="">Search result for {{ key }}</div>
</template>

<script setup lang="ts">
const query = computed<string>(() => useRoute().query.q as string)
const key = ref<string>(query.value?.toString() || '')

watch(
  () => query.value,
  (val) => {
    key.value = val as string
  }
)
</script>
