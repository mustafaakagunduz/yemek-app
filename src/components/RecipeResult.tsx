import { useTranslation } from 'react-i18next'

interface Props {
  recipe: string
  onReset: () => void
}

export default function RecipeResult({ recipe, onReset }: Props) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <div className="text-4xl mb-2">👨‍🍳</div>
        <h2 className="text-xl font-bold text-gray-800">{t('Your Recipe')}</h2>
      </div>
      <div className="bg-orange-50 rounded-2xl p-4 max-h-96 overflow-y-auto">
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{recipe}</p>
      </div>
      <button
        onClick={onReset}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold text-lg shadow-lg hover:from-orange-500 hover:to-pink-600 transition-all active:scale-95"
      >
        {t('Start Over')}
      </button>
    </div>
  )
}
