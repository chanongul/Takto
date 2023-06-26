export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  imports: {
    dirs: ['stores'],
  },
  modules: [
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxtjs/sanity',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
  ],
  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },
  sanity: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
    token: process.env.SANITY_STUDIO_TOKEN,
    useCdn: true,
  },
})
