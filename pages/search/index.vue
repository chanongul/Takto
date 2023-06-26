<template>
  <div class="">Search result for {{ key }}</div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const key = ref<string>(route.query.q?.toString() || '')

watch(
  () => route.query.q,
  (val) => {
    key.value = val as string
  }
)
</script>
