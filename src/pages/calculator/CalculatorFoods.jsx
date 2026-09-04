import React, { useState } from 'react'
import { useLang } from '../../context/language'

// Traduce la etiqueta cualitativa a un tono. Para proteina "alto" es bueno;
// para azucar es al reves.
const toneFor = (label, kind) => {
  if (kind === 'protein') {
    if (label.startsWith('Rich')) return 'good'
    if (label.startsWith('Moderate')) return 'warn'
    return 'neutral'
  }
  if (kind === 'sugar') {
    if (label.startsWith('Low')) return 'good'
    if (label.startsWith('Moderate')) return 'warn'
    if (label.startsWith('High')) return 'bad'
  }
  return 'neutral'
}

export const CalculatorFoods = () => {
  const [calories, setCalories] = useState("")
  const [protein, setProtein] = useState("")
  const [portion, setPortion] = useState("")
  const [sugar, setSugar] = useState("")
  const [loading, setLoading] = useState(false)
  const { t } = useLang()
  const [result, setResult] = useState(null)

  const handleCalculate = () => {
    setLoading(true)

    // Calculations
    const proteinCalories = protein * 4
    const proteinPercentage = (proteinCalories / calories) * 100
    const kcalPerGram = calories / portion
    const sugarCalories = sugar ? sugar * 4 : 0
    const sugarPercentage = (sugarCalories / calories) * 100

    // Classification in protein
    let proteinLabel
    if (proteinPercentage >= 25) proteinLabel = "Rich in protein"
    else if (proteinPercentage >= 15) proteinLabel = "Moderate in protein"
    else proteinLabel = "Low in protein"

    // Classification in calories
    let calorieDensity
    if (kcalPerGram <= 1) calorieDensity = "Low in calories"
    else if (kcalPerGram <= 3) calorieDensity = "Moderate in calories"
    else calorieDensity = "High in calories"

    // Classification in sugar
    let sugarLabel = "No data"
    if (sugar) {
      if (sugarPercentage <= 10) sugarLabel = "Low in sugar"
      else if (sugarPercentage <= 25) sugarLabel = "Moderate in sugar"
      else sugarLabel = "High in sugar"
    }

    // Result
    setResult({
      proteinPercentage,
      sugarPercentage,
      kcalPerGram,
      proteinLabel,
      calorieDensity,
      sugarLabel
    })

    setTimeout(() => setLoading(false), 800)
  }

  return (
    <div className='px-6 py-8'>
      <div>
        <h1 className='text-center text-4xl mb-6 font-semibold'>{t('food.title')}</h1>
        <div className='max-w-xl mx-auto p-6 bg-raised border border-line rounded-lg shadow-lg'>
          <div className='mb-6'>

            {/* Calories */}
            <label className='block font-semibold mb-2 mt-4 text-ink'>{t('food.energy')}</label>
            <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)}
              className='w-full px-3 py-2.5 rounded-lg bg-sunken border border-line text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition' required />

            {/* Protein */}
            <label className='block font-semibold mb-2 mt-4 text-ink'>{t('food.protein')}</label>
            <input type="number" value={protein} onChange={(e) => setProtein(e.target.value)}
              className='w-full px-3 py-2.5 rounded-lg bg-sunken border border-line text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition' required />

            {/* Sugar */}
            <label className='block font-semibold mb-2 mt-4 text-ink'>{t('food.sugar')}</label>
            <input type="number" value={sugar} onChange={(e) => setSugar(e.target.value)}
              className='w-full px-3 py-2.5 rounded-lg bg-sunken border border-line text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition' />

            {/* Portion */}
            <label className='block font-semibold mb-2 mt-4 text-ink'>{t('food.portion')}</label>
            <input type="number" value={portion} onChange={(e) => setPortion(e.target.value)}
              className='w-full px-3 py-2.5 rounded-lg bg-sunken border border-line text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition' required />
          </div>

          {/* Button */}
          <button type='submit'
            className='w-full mt-6 px-4 py-2.5 rounded-lg font-semibold
              bg-accent text-on-accent hover:bg-accent-hover transition
              disabled:opacity-60 disabled:cursor-not-allowed'
            disabled={loading} onClick={handleCalculate}>
            {loading ? t('calc.calculating') : t('calc.calculate')}
          </button>

        </div>

        {/* Resultados fuera de la tarjeta del formulario, con la lectura cualitativa
            en color solo donde el sentido es inequivoco: mas proteina mejor,
            mas azucar peor. La densidad calorica queda neutra porque depende
            de si estas en deficit o superavit. */}
        {result && (
          <div className='max-w-xl mx-auto mt-6 space-y-3'>
            {[
              {
                label: t('food.proteinPct'),
                value: `${result.proteinPercentage.toFixed(1)}%`,
                note: result.proteinLabel,
                tone: toneFor(result.proteinLabel, 'protein'),
              },
              ...(sugar ? [{
                label: t('food.sugarPct'),
                value: `${result.sugarPercentage.toFixed(1)}%`,
                note: result.sugarLabel,
                tone: toneFor(result.sugarLabel, 'sugar'),
              }] : []),
              {
                label: t('food.density'),
                value: `${result.kcalPerGram.toFixed(2)} kcal/g`,
                note: result.calorieDensity,
                tone: 'neutral',
              },
            ].map((r) => (
              <div key={r.label}
                className='flex items-center justify-between gap-4 flex-wrap
                  bg-raised border border-line rounded-xl px-4 py-3.5'>
                <div className='text-sm text-ink-muted'>{r.label}</div>
                <div className='flex items-center gap-3'>
                  <span className='text-xl font-bold tabular-nums text-ink'>{r.value}</span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap
                    ${r.tone === 'good' ? 'bg-success-soft text-success'
                      : r.tone === 'warn' ? 'bg-warning-soft text-warning'
                      : r.tone === 'bad' ? 'bg-danger-soft text-danger'
                      : 'bg-sunken text-ink-muted'}`}>
                    {r.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal load */}
        {loading && (
          <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'>
            <div className='bg-raised border border-line p-8 rounded-2xl shadow-xl text-center min-w-[16rem]'>
              <p className='text-xl font-bold mb-4 text-ink'>{t('auth.loading')}</p>
              <div className="progress-track" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
