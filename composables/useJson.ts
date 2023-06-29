export async function useJson(content: string) {
  const { language } = useLanguageStore()
  const { setLoading } = useLoadingStore()
  let contents = Array(0) as JsonContents
  setLoading(true)
  try {
    const getContent = await useAsyncData(content, () =>
      queryContent<JsonContents>(`/${content}`).find()
    )
    contents =
      (getContent.data.value?.length || 0) > 1
        ? getContent.data.value?.at(language === 'en' ? 0 : 1)?.body
        : getContent.data.value?.at(0)?.body
    setLoading(false)
  } catch (error) {
    setLoading(false)
    console.log(error)
  }

  return { contents }
}
