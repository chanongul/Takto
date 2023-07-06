<template>
  <div v-if="!productLoading && !variantLoading" class="">
    <div>
      {{ params.language === 'en' ? product?.title : product?.titleTH }}
    </div>
    <div>
      {{
        params.language === 'en' ? product?.description : product?.descriptionTH
      }}
    </div>
    <div :class="['flex']">
      <div v-for="color in product?.colors" :key="color._id">
        <input
          :class="['hidden', 'peer/color']"
          :id="color._id"
          :value="color.name"
          type="radio"
          name="color"
          v-model="selectedColor"
        />
        <label
          :for="color._id"
          :class="[
            'block',
            'w-3 aspect-square',
            'border-[0.5px] border-black rounded-full',
            'hover:opacity-70',
            'peer-checked/color:outline',
          ]"
          :style="{ 'background-color': color.code }"
        />
      </div>
    </div>
    <div :class="['flex']">
      <div v-for="size in product?.sizes" :key="size._id">
        <input
          :class="['hidden', 'peer/size']"
          :id="size._id"
          :value="size.name"
          type="radio"
          name="size"
          v-model="selectedSize"
        />
        <label :for="size._id" :class="['peer-checked/size:font-bold']">
          {{ size.title }}
        </label>
      </div>
    </div>
    <div :class="[]">{{ selectedVariant.price }}</div>
  </div>
  <p v-else>Loading...</p>
</template>

<script setup lang="ts">
const { params, query } = useRoute()
const { product, pending: productLoading } = await getProduct()
const { variants, pending: variantLoading } = await getProductVariants()
const selectedColor = ref<ProductColor['name']>(
  (query.color as string) || product.value?.colors[0].name || ''
)
const selectedSize = ref<ProductSize['name']>('')

const selectedVariant = computed<ProductVariant>(() => {
  if (selectedSize.value !== '') {
    return variants.value?.filter(
      (val: ProductVariant) =>
        val.color.name === selectedColor.value &&
        val.size.name === selectedSize.value
    )[0] as ProductVariant
  } else {
    const variant = variants.value?.filter(
      (val: ProductVariant) => val.color.name === selectedColor.value
    )[0] as ProductVariant
    return { ...variant, price: variant.product.price }
  }
})

async function getProduct() {
  const {
    data: product,
    error,
    pending,
  } = await useAsyncData('product', () =>
    $fetch<Product>(`/api/product`, {
      method: 'get',
      query: {
        id: (params.product as string).split('_')[1],
      },
    })
  )
  if (error.value) {
    throw createError({
      statusCode: (error.value as ErrorWithCode)?.statusCode,
      statusMessage: (error.value as ErrorWithCode)?.message,
    })
  }
  return { product, pending }
}

async function getProductVariants() {
  const {
    data: variants,
    error,
    pending,
  } = await useAsyncData('variants', () =>
    $fetch<ProductVariant[]>(`/api/product/variant`, {
      method: 'get',
      query: {
        productId: (params.product as string).split('_')[1],
      },
    })
  )
  if (error.value) {
    throw createError({
      statusCode: (error.value as ErrorWithCode)?.statusCode,
      statusMessage: (error.value as ErrorWithCode)?.message,
    })
  }
  return { variants, pending }
}
</script>
