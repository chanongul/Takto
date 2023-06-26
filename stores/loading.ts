export const useLoadingStore = defineStore('loading', () => {
  const loading = ref<boolean>(false)
  function setLoading(isLoading: boolean) {
    loading.value = isLoading
  }

  return { loading, setLoading }
})
