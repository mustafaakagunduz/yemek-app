import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitch from './components/LanguageSwitch'
import DishInput from './components/DishInput'
import IngredientList from './components/IngredientList'
import RecipeResult from './components/RecipeResult'
import { getIngredients, getRecipe } from './services/openai'

const STEP = {
  INPUT: 'input',
  INGREDIENTS: 'ingredients',
  RECIPE: 'recipe',
} as const

type Step = (typeof STEP)[keyof typeof STEP]

export default function App() {
  const { t, i18n } = useTranslation()
  const [step, setStep] = useState<Step>(STEP.INPUT)
  const [dish, setDish] = useState('')
  const [ingredients, setIngredients] = useState<string[]>([])
  const [recipe, setRecipe] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDishSubmit = async (dishName: string) => {
    setLoading(true)
    setError('')
    try {
      const list = await getIngredients(dishName, i18n.language)
      setDish(dishName)
      setIngredients(list)
      setStep(STEP.INGREDIENTS)
    } catch {
      setError(t('Something went wrong. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  const handleIngredientsSubmit = async (selected: string[]) => {
    setLoading(true)
    setError('')
    try {
      const result = await getRecipe(dish, selected, i18n.language)
      setRecipe(result)
      setStep(STEP.RECIPE)
    } catch {
      setError(t('Something went wrong. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setStep(STEP.INPUT)
    setDish('')
    setIngredients([])
    setRecipe('')
    setError('')
  }

  return (
    <div className="animated-gradient min-h-screen">
      <div className="max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                {error}
              </div>
            )}
            {step === STEP.INPUT && (
              <DishInput onSubmit={handleDishSubmit} loading={loading} />
            )}
            {step === STEP.INGREDIENTS && (
              <IngredientList
                dish={dish}
                ingredients={ingredients}
                onSubmit={handleIngredientsSubmit}
                loading={loading}
              />
            )}
            {step === STEP.RECIPE && (
              <RecipeResult recipe={recipe} onReset={reset} />
            )}
          </div>
        </div>
        <div className="mt-6">
          <LanguageSwitch />
        </div>
      </div>
    </div>
  )
}
