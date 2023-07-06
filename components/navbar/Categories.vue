<template>
  <ClientOnly>
    <div v-if="categories" class="flex">
      <NuxtLink
        v-for="(category) in categories"
        :key="category.value"
        :to="{
          name: 'language-category',
          params: {
            language: language,
            category: category.value,
          },
        }"
      >
        {{ category.title }}
      </NuxtLink>
    </div>
    <template #placeholder></template>
  </ClientOnly>
</template>

<script setup lang="ts">
const language = computed<string>(() => useRoute().params.language as string)
const { contents: categories } = useJson('categories')
</script>
