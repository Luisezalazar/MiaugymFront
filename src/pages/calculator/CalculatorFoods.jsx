import React, { useState } from 'react'

export const CalculatorFoods = () => {
  const [calories, setCalories] = useState("")
  const [protein, setProtein] = useState("")
  const [portion, setPortion] = useState("")
  const [sugar, setSugar] = useState("")
  const [loading, setLoading] = useState(false)
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
        <h1 className='text-center text-4xl mb-6 font-semibold'>Foods Protein Checker</h1>
        <div className='max-w-xl mx-auto p-6 dark:bg-neutral-900 rounded-lg shadow-lg bg-[#0202FF]'>
          <h1 className='text-center text-2xl font-bold text-white'>
            Miau<span className='dark:text-primary-300 text-black'>Gym</span>
          </h1>

          <div className='mb-6'>

            {/* Calories */}
            <label className='block font-semibold mb-2 mt-4 text-white'>Energy value(Kcal)</label>
            <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)}
              className='w-full py-2 px-2 border-2 rounded-lg text-white dark:bg-neutral-900 bg-[#0202FF]' required />

            {/* Protein */}
            <label className='block font-semibold mb-2 mt-4 text-white'>Protein (g)</label>
            <input type="number" value={protein} onChange={(e) => setProtein(e.target.value)}
              className='w-full py-2 px-2 border-2 rounded-lg text-white dark:bg-neutral-900 bg-[#0202FF]' required />

            {/* Sugar */}
            <label className='block font-semibold mb-2 mt-4 text-white'>Sugar (g)</label>
            <input type="number" value={sugar} onChange={(e) => setSugar(e.target.value)}
              className='w-full py-2 px-2 border-2 rounded-lg text-white dark:bg-neutral-900 bg-[#0202FF]' />

            {/* Portion */}
            <label className='block font-semibold mb-2 mt-4 text-white'>Grams per portion (g)</label>
            <input type="number" value={portion} onChange={(e) => setPortion(e.target.value)}
              className='w-full py-2 px-2 border-2 rounded-lg text-white dark:bg-neutral-900 bg-[#0202FF]' required />
          </div>

          {/* Button */}
          <div className="mt-6 text-right">
            <button type='submit'
              className={`px-4 py-2 rounded-lg transition text-white ${loading ? "dark:bg-primary-300 cursor-not-allowed" : "dark:bg-primary-300 dark:hover:bg-primary-500 dark:text-black font-semibold border-2 bg-[#0202FF] hover:bg-[#3232ff]"}`}
              disabled={loading} onClick={handleCalculate}>
              {loading ? "Calculating..." : "Calculate"}
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className="mt-6 bg-gray-800 p-6 rounded-lg text-white">
              <h2 className="text-xl font-bold mb-4">Nutritional results</h2>
              <p><strong>% Proteins in calories:</strong> {result.proteinPercentage.toFixed(1)}% ({result.proteinLabel})</p>
              {sugar && (
                <>
                  <p><strong>% Sugar calories:</strong> {result.sugarPercentage.toFixed(1)}% ({result.sugarLabel})</p>
                </>
              )}
              <p><strong>Calorie density:</strong> {result.kcalPerGram.toFixed(2)} kcal/g ({result.calorieDensity})</p>
            </div>
          )}
        </div>

        {/* Modal load */}
        {loading && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='bg-gray-800 p-8 rounded-2xl shadow-xl text-center'>
              <p className='text-xl font-bold mb-4 text-white'>Loading...</p>
              <div className='w-64 bg-gray-200 rounded-full h-4 overflow-hidden'>
                <div className='bg-primary-600 h-4 animate-pulse w-1/2'></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
