<template>
  <NuxtLink :to="props.to">
    <div :class="[]">{{ props.title }}</div>
    <div :class="['flex', 'h-3']">
      <NuxtLink
        v-for="color in props.colors"
        :key="color._id"
        :to="{ 
          path: props.to,
          query: { color: color.name },
        }"
        :class="[
          'aspect-square',
          'border-[0.5px] border-black rounded-full',
          'hover:opacity-70',
        ]"
        :style="{ 'background-color': color.code }"
      />
    </div>
    <div :class="[]">&#3647;{{ props.price }}</div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: Product['title' | 'titleTH']
  to: string
  colors: ProductColor[]
  price: Product['price']
}>()
</script>
