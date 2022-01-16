import { createI18n } from 'vue-i18n'
import messages from '@/locales/messages'

const i18n = createI18n({
  locale: import.meta.env.VITE_APP_I18N_LOCALE || 'en',
  fallbackLocale: import.meta.env.VITE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: messages,
})

export default i18n
