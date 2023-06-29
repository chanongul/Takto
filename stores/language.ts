export const useLanguageStore = defineStore('language', () => {
  const language = ref<string>('en')
  function setLanguage(newLang: string) {
    language.value = newLang
  }

  return { language, setLanguage }
})
