<template>
  <input
    class=""
    type="text"
    :value="props.modelValue"
    @input="(e: Event)=>emit('update:modelValue', (e.target as HTMLInputElement).value)"
    placeholder="Search..."
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  (event: 'update:modelValue', data: string): void
}>()
</script>
