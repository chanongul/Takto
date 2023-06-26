export default async function (): Promise<Category[]> {
  const { language } = useLanguageStore()
  const { setLoading } = useLoadingStore()
  setLoading(true)
  try {
    const getCategories = await useAsyncData('categories', () =>
      queryContent<Categories>(`/jsons/categories/${language}`).find()
    )
    const categories: Category[] = getCategories.data.value?.at(0)?.body
    setLoading(false)
    return categories
  } catch (error) {
    setLoading(false)
    return []
  }
}
