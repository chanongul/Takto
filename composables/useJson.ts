export async function useJson(content: string) {
  const language = computed(() => useRoute().params.language)
  let contents = Array(0) as JsonContents
  try {
    const { data } = await useAsyncData(content, () =>
      queryContent<JsonContents>(`/${content}`).find()
    )
    contents =
      (data.value?.length || 0) > 1
        ? data.value?.at(language.value === 'en' ? 0 : 1)?.body
        : data.value?.at(0)?.body
  } catch (error) {
    console.log(error)
  }

  return { contents }
}
