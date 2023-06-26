export const useLanguageStore = defineStore('language', () => {
  const language = ref<string>('th')
  function setLanguage(newLang: string) {
    language.value = newLang
  }

  return { language, setLanguage }
})
