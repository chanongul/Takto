<template>
  <nav>
    <ul class="flex">
      <li>
        <NuxtLink
          :to="{
            name: 'language',
            params: { language: language },
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
            params: { language: language },
          }"
          ><Iconify icon="cart"
        /></NuxtLink>
      </li>
      <li>
        <NuxtLink
          :to="{
            name: 'language-favorites',
            params: { language: language },
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
            params: { language: language },
          }"
          ><Iconify icon="profile"
        /></NuxtLink>
        <NuxtLink
          v-else
          :to="{
            name: 'language-login',
            params: { language: language },
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
const language = computed<string>(() => useRoute().params.language as string)
const key = ref<string>('')

function onSearch() {
  push({
    name: 'language-search',
    params: {
      language: language.value,
    },
    query: {
      q: key.value,
    },
  })
  key.value = ''
}
</script>
