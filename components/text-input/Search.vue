<template>
  <div>
    <input
      v-if="props.show || true"
      type="search"
      :class="[showSearchBar ? 'w-20' : 'w-0', 'transition-[width]']"
      :value="props.modelValue"
      @input="(e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
      placeholder="Search..."
    />
    <button type="button" @click="toggleSearchBarDisplay">
      <Iconify icon="search" />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  show?: boolean
}>()
const emit = defineEmits<{
  (event: 'update:modelValue', data: string): void
}>()

const showSearchBar = ref(false)

function toggleSearchBarDisplay() {
  if (!props.show) {
    showSearchBar.value = !showSearchBar.value
  } else {
    showSearchBar.value = false
  }
}
</script>
