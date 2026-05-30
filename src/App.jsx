import { useTranslation } from 'react-i18next'

function App() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <h1 className="text-3xl font-bold text-orange-500">{t('Food App')}</h1>
    </div>
  )
}

export default App
