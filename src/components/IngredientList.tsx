import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  dish: string
  ingredients: string[]
  onSubmit: (selected: string[]) => void
  loading: boolean
}

export default function IngredientList({ dish, ingredients, onSubmit, loading }: Props) {
  const { t } = useTranslation()
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [extraInput, setExtraInput] = useState('')
  const [extras, setExtras] = useState<string[]>([])

  const toggle = (item: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      next.has(item) ? next.delete(item) : next.add(item)
      return next
    })
  }

  const addExtra = () => {
    const val = extraInput.trim()
    if (val && !extras.includes(val)) {
      setExtras((prev) => [...prev, val])
      setExtraInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addExtra()
    }
  }

  const totalSelected = checked.size + extras.length

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <div className="text-4xl mb-2">🛒</div>
        <h2 className="text-xl font-bold text-gray-800">
          {t('Ingredients for {{dish}}', { dish })}
        </h2>
        <p className="text-gray-500 text-sm mt-1">{t('Check the ingredients you have')}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
        {ingredients.map((item) => (
          <label
            key={item}
            className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer border-2 transition-all select-none ${
              checked.has(item)
                ? 'border-orange-400 bg-orange-50 text-orange-700'
                : 'border-gray-200 bg-white text-gray-600 hover:border-orange-200'
            }`}
          >
            <input
              type="checkbox"
              className="sr-only"
              checked={checked.has(item)}
              onChange={() => toggle(item)}
            />
            <span
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                checked.has(item) ? 'border-orange-400 bg-orange-400' : 'border-gray-300'
              }`}
            >
              {checked.has(item) && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            <span className="text-sm font-medium leading-tight">{item}</span>
          </label>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={extraInput}
            onChange={(e) => setExtraInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('Add extra ingredient...')}
            className="flex-1 px-4 py-3 rounded-xl border-2 border-dashed border-pink-300 focus:border-pink-400 focus:outline-none text-sm text-gray-700 placeholder-gray-400 transition-colors"
          />
          <button
            onClick={addExtra}
            disabled={!extraInput.trim()}
            className="px-4 py-3 rounded-xl bg-pink-100 text-pink-600 font-bold text-sm hover:bg-pink-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t('Add')}
          </button>
        </div>
        {extras.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {extras.map((item) => (
              <span
                key={item}
                className="flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium"
              >
                {item}
                <button
                  onClick={() => setExtras((prev) => prev.filter((e) => e !== item))}
                  className="ml-1 text-pink-400 hover:text-pink-600 font-bold leading-none"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => onSubmit([...checked, ...extras])}
        disabled={loading || totalSelected === 0}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold text-lg shadow-lg hover:from-pink-600 hover:to-orange-500 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {t('Loading...')}
          </span>
        ) : (
          `${t('Get Recipe')} (${totalSelected})`
        )}
      </button>
    </div>
  )
}
