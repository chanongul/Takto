<template></template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const { replace } = useRouter()

replace({
  name: 'language',
  params: { language: 'en' },
})
</script>

