<template>
  <ClientOnly>
    <div v-if="categories" class="flex">
      <NuxtLink
        v-for="category in categories"
        :key="category.value"
        :to="{
          name: 'language-category',
          params: {
            language: params.language,
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
const params = computed(() => useRoute().params)
const { contents: categories } = await useJson('categories')
</script>
