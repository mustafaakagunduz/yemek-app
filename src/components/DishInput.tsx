import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  onSubmit: (dish: string) => void
  loading: boolean
}

export default function DishInput({ onSubmit, loading }: Props) {
  const { t } = useTranslation()
  const [dish, setDish] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (dish.trim()) onSubmit(dish.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
      <div className="text-6xl">🍽️</div>
      <h1 className="text-2xl font-bold text-center text-gray-800 leading-tight">
        {t('What dish do you want to make?')}
      </h1>
      <input
        type="text"
        value={dish}
        onChange={(e) => setDish(e.target.value)}
        placeholder={t('Type a dish name...')}
        className="w-full px-5 py-4 rounded-2xl border-2 border-orange-200 focus:border-orange-400 focus:outline-none text-lg text-gray-700 placeholder-gray-400 transition-colors"
        disabled={loading}
        autoFocus
      />
      <button
        type="submit"
        disabled={loading || !dish.trim()}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold text-lg shadow-lg hover:from-orange-500 hover:to-pink-600 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {t('Loading...')}
          </span>
        ) : (
          t('Get Ingredients')
        )}
      </button>
    </form>
  )
}
