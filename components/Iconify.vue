<template>
  <Icon :name="selectedIcon" :color="props.color" />
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string
  color?: string
}>()

const selectedIcon = computed(() => {
  // look up https://icones.js.org/
  switch (props.icon) {
    case 'cart':
      return 'material-symbols:shopping-cart-outline-rounded'
    case 'heart':
      return 'material-symbols:favorite-outline-rounded'
    case 'profile':
      return 'material-symbols:person-outline-rounded'
    case 'search':
      return 'material-symbols:search-rounded'
    default:
      return props.icon
  }
})
</script>
