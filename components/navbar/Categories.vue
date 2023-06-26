<template>
  <ul class="flex">
    <li v-for="category in categories">
      <NuxtLink
        :to="{ name: 'category', params: { category: category.value } }"
      >
        {{ category.title }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
const { language } = useLanguageStore()

const getCategories = await useAsyncData('navCategories', () =>
  queryContent<Categories>(`/jsons/categories/${language}`).find()
)
const categories: Category[] = (getCategories.data.value || [])[0].body
</script>
