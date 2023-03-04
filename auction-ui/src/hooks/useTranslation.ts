/* eslint-disable no-restricted-imports */
import rosetta from 'rosetta'

import homejson from 'public/locales/en/home.json'

const i18n = rosetta({
  en: { home: homejson },
})

i18n.locale('en')

export const useTranslation = () => {
  return { ...i18n }
}
