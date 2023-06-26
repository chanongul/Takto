<template>
  <div>{{ error.statusCode }} - {{ error.message }}</div>
</template>

<script setup lang="ts">
defineProps<{
  error: IError
}>()
</script>
