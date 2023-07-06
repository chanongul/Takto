import categories from '@/static/categories/en.json'
import categoriesTH from '@/static/categories/th.json'
import countries from '@/static/countries/en.json'
import countriesTH from '@/static/countries/th.json'
import languages from '@/static/languages.json'
import orderStatuses from '@/static/order-statuses/en.json'
import orderStatusesTH from '@/static/order-statuses/th.json'
import zipRegexen from '@/static/zip-regexen.json'

export function useJson(select: string) {
  const language = computed<string>(() => useRoute().params.language as string)
  const contents = computed<FromJson[]>(() => {
    switch (select) {
      case 'categories':
        return (
          language.value === 'en' ? categories : categoriesTH
        ) as FromJson[]
      case 'countries':
        return (language.value === 'en' ? countries : countriesTH) as FromJson[]
      case 'languages':
        return languages as FromJson[]
      case 'orderStatuses':
        return (
          language.value === 'en' ? orderStatuses : orderStatusesTH
        ) as FromJson[]
      case 'zipRegexen':
        return zipRegexen as FromJson[]
      default:
        return [] as FromJson[]
    }
  })
  return { contents }
}
