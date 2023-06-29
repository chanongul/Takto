<template>
  <ul class="flex">
    <li v-for="category in categories" :key="category.value">
      <NuxtLink
        :to="{
          name: 'category',
          params: { category: category.value },
        }"
      >
        {{ category.title }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
const { contents: categories } = await useJson('categories')
</script>
