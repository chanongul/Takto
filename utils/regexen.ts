import zipRegexen from '../content/zip-regex.json'

export function ZIP_FORMAT(country: string): RegExp {
  if (!country) {
    return new RegExp('')
  }
  const zipRegex = zipRegexen.find((val) => val.country === country)?.zipRegex
  return new RegExp(zipRegex || '')
}
