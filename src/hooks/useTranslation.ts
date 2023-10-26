/* eslint-disable no-restricted-imports */
import rosetta from 'rosetta'

import home from 'public/locales/en/home.json'
import common from 'public/locales/en/common.json'
import registration from 'public/locales/en/registration.json'
import login from 'public/locales/en/login.json'

const i18n = rosetta({
  en: { home, common, registration, login },
})

i18n.locale('en')

export default function useTranslation() {
  return { ...i18n }
}
