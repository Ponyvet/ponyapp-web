import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import sharedEs from '@/app/locales/es.json'

i18n.use(initReactI18next).init({
  lng: 'es',
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    es: sharedEs,
  },
})

