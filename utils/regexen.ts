import zipRegexen from '../content/zip-regexen.json'

export function ZIP_FORMAT(country: string): RegExp {
  if (!country) {
    return new RegExp('')
  }
  const zipRegex = zipRegexen.find((val) => val.title === country)?.value
  return new RegExp(zipRegex || '')
}
