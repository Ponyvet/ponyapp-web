import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import authEs from '@/features/auth/locales/es.json'
import sharedEs from '@/shared/locales/es.json'

i18n.use(initReactI18next).init({
  lng: 'es',
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    es: {
      auth: authEs,
      shared: sharedEs,
    },
  },
})

export default i18n
