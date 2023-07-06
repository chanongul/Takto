<template>
  <nav>
    <ul class="flex">
      <li>
        <NuxtLink
          :to="{
            name: 'language',
            params: {
              language: params.language,
            },
          }"
          >home
        </NuxtLink>
      </li>
      <li>
        <form @submit.prevent="onSearch">
          <TextInputSearch v-model="key" />
        </form>
      </li>
      <li>
        <NuxtLink
          :to="{
            name: 'language-cart',
            params: {
              language: params.language,
            },
          }"
          ><Iconify icon="cart"
        /></NuxtLink>
      </li>
      <li>
        <NuxtLink
          :to="{
            name: 'language-favorites',
            params: {
              language: params.language,
            },
          }"
          ><Iconify icon="heart"
        /></NuxtLink>
      </li>
      <li><NavbarLanguageChanger /></li>
      <li>
        <NuxtLink
          v-if="0"
          :to="{
            name: 'language-profile',
            params: {
              language: params.language,
            },
          }"
          ><Iconify icon="profile"
        /></NuxtLink>
        <NuxtLink
          v-else
          :to="{
            name: 'language-login',
            params: {
              language: params.language,
            },
          }"
          >Log In</NuxtLink
        >
      </li>
    </ul>

    <NavbarCategories />
  </nav>
</template>

<script setup lang="ts">
const { push } = useRouter()
const params = computed(() => useRoute().params).value
const key = ref<string>('')

function onSearch() {
  push({
    name: 'language-search',
    params: {
      language: params.language,
    },
    query: {
      q: key.value,
    },
  })
  key.value = ''
}
</script>
