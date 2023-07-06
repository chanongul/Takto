<template>
  <div v-if="!pending">
    <div :class="[]">{{ category.title }} Catalog</div>
    <div v-if="products" :class="['grid']">
      <div
        v-for="product in products"
        :key="product._id"
        :class="['block', 'bg-', 'w-fit', 'cursor-pointer']"
      >
        <CatalogCard
          :title="language === 'en' ? product.title : product.titleTH"
          :to="`/${language}/${category.value}/${product.slug}_${product._id}`"
          :colors="product.colors"
          :price="product.price"
        />
      </div>
    </div>
  </div>
  <p v-else>loading...</p>
</template>

<script setup lang="ts">
const language = computed<string>(() => useRoute().params.language as string)
const categoryFromParams = computed<string>(
  () => useRoute().params.category as string
)
const { contents: categories } = useJson('categories')
const category = categories.value.find(
  (category: FromJson) => category.value === categoryFromParams.value
) || { title: '', value: '' }
const { data: products, pending } = await getProducts()

async function getProducts() {
  const { data, error, pending } = await useAsyncData('product', () =>
    $fetch<Product[]>(`/api/product`, {
      method: 'get',
      query: {
        category: category?.value,
      },
    })
  )
  if (error.value) {
    throw createError({
      statusCode: (error.value as ErrorWithCode)?.statusCode,
      statusMessage: (error.value as ErrorWithCode)?.message,
    })
  }
  return { data, pending }
}
</script>
