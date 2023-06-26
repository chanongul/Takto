<template>
  <div class="">{{ category }} Catalog</div>
</template>

<script setup lang="ts">
const { params } = useRoute()

const categories: Category[] = await useCategories()

const category: string =
  categories.find((category: Category) => category.value === params.category)
    ?.title || ''
</script>
