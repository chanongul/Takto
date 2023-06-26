<template>
  <nav>
    <ul class="flex">
      <li><NuxtLink to="/">home</NuxtLink></li>
      <li>
        <form @submit.prevent="onSearch">
          <TextInputSearch v-model="key" />
        </form>
      </li>
      <li>
        <NuxtLink to="/cart"><Iconify icon="cart" /></NuxtLink>
      </li>
      <li>
        <NuxtLink to="/favorites"><Iconify icon="heart" /></NuxtLink>
      </li>
      <NavbarLanguageChanger />
      <li v-if="0">
        <NuxtLink to="/profile"><Iconify icon="profile" /></NuxtLink>
      </li>
      <li v-else><NuxtLink to="/login">Log In</NuxtLink></li>
    </ul>

    <NavbarCategories />
  </nav>
</template>

<script setup lang="ts">
const { name } = useRoute()
const router = useRouter()

const key = ref<string>('')

function onSearch() {
  router.push({
    name: 'search',
    query: {
      q: key.value,
    },
    replace: false,
  })
  key.value = ''
}
</script>
