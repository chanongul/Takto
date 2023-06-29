<template>
  <div class="">{{ category }} Catalog</div>
</template>

<script setup lang="ts">
const { params } = useRoute()

const { contents: categories } = await useJson('categories')

const category: string =
  categories.find((category: JsonContent) => category.value === params.category)
    ?.title || ''
</script>
