import { useTranslation } from 'react-i18next'

export default function LanguageSwitch() {
  const { i18n } = useTranslation()
  const isTR = i18n.language?.startsWith('tr')

  return (
    <div className="flex justify-center">
      <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full p-1">
        <button
          onClick={() => i18n.changeLanguage('tr')}
          className={`px-4 py-2 rounded-full transition-all duration-200 ${
            isTR ? 'bg-white shadow-md' : ''
          }`}
        >
          <span className="text-xl grayscale">🇹🇷</span>
        </button>
        <button
          onClick={() => i18n.changeLanguage('en')}
          className={`px-4 py-2 rounded-full transition-all duration-200 ${
            !isTR ? 'bg-white shadow-md' : ''
          }`}
        >
          <span className="text-xl grayscale">🇬🇧</span>
        </button>
      </div>
    </div>
  )
}
