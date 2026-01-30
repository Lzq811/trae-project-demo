import { createI18n } from 'vue-i18n'
import zhCN from '../locales/zh-CN'
import zhTW from '../locales/zh-TW'
import enUS from '../locales/en-US'

const DEFAULT_LOCALE = (localStorage.getItem('locale') as string) || 'zh-CN'

export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    'en-US': enUS
  }
})

export const setLocale = (locale: 'zh-CN' | 'zh-TW' | 'en-US') => {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
}
