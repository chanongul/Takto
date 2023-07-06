import zipRegexen from '../static/zip-regexen.json'

export const ZIP_FORMAT = (country: string): RegExp => {
  if (!country) {
    return new RegExp('')
  }
  const zipRegex = zipRegexen.find((val) => val.title === country)?.value
  return new RegExp(zipRegex || '')
}

export const COLOR_HEX_CODE_FORMAT: RegExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/