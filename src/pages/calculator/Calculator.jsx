import React, { useState } from 'react'

export const Calculator = () => {

    const [loading, setLoading] = useState(false)
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")
    const [activity, setActivity] = useState("")

    const [result, setResult] = useState(null)

    const handleCalculate = () => {
        setLoading(true)

        let BMR
        if (gender === "male") {
            BMR = 10 * weight + 6.25 * height - (5 * age) + 5
        } else {
            BMR = 10 * weight + 6.25 * height - (5 * age) - 161
        }

        const activityFactors = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            intense: 1.725,
            veryIntense: 1.9
        }

        const maintenance = BMR * activityFactors[activity]
        const deficit = maintenance - 500
        const plus = maintenance + 500

        setResult({ maintenance, deficit, plus })
        setTimeout(() => setLoading(false), 800)
    }

    return (
        <div className='px-6 py-8'>
            <div>
                <h1 className='text-center text-4xl mb-6 font-semibold'>Calorie Calculator</h1>
                <div className='max-w-xl mx-auto p-6 dark:bg-neutral-900 rounded-lg shadow-lg bg-[#0202FF] '>
                    <h1 className='text-center text-2xl font-bold text-white'>Miau<span className='dark:text-primary-300 text-black'>Gym</span></h1>
                    <div className='mb-6'>

                        {/* Gender */}
                        <label className='block font-semibold mb-2  text-white'>Gender</label>

                        <select name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}
                            className='w-full py-2 px-2 border-2 rounded-lg focus:ring-2 dark:focus:ring-primary-500 dark:bg-neutral-900 text-white bg-[#0202FF]' required>
                            <option value="">-Select-</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>

                        {/* Age */}
                        <label className='block font-semibold mb-2 mt-4 text-white'>Age</label>
                        <input type="number" name='age' value={age} onChange={(e) => setAge(e.target.value)}
                            className='w-full py-2 px-2 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 text-white' required />

                        {/* Weight */}
                        <label className='block font-semibold mb-2 mt-4 text-white'>Weight</label>
                        <input type="number" name='weight' value={weight} onChange={(e) => setWeight(e.target.value)}
                            className='w-full py-2 px-2 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 text-white' required />

                        {/* Height */}
                        <label className='block font-semibold mb-2 mt-4 text-white'>Height (cm)</label>
                        <input type="number" name='height' value={height} onChange={(e) => setHeight(e.target.value)}
                            className='w-full py-2 px-2 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 text-white' required />

                        <label className='block font-semibold mb-2 mt-4 text-white'>Activity level</label>
                        <select name="activity" id="activity" value={activity} onChange={(e) => setActivity(e.target.value)}
                            className='w-full py-2 px-2 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-neutral-900 text-white bg-[#0202FF]' required>
                            <option value="">-Select-</option>
                            <option value="sedentary">Sedentary (little or no exercise)</option>
                            <option value="light">Light (exercise 1-3 days/week)</option>
                            <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                            <option value="intense">Intense (exercise 6-7 days/week)</option>
                            <option value="veryIntense">Very intense (training 2 times/day, strong physical work)</option>
                        </select>

                    </div>

                    {/* Save button */}
                    <div className="mt-6 text-right">
                        <button type='submit'
                            className={`px-4 py-2 rounded-lg transition text-white ${loading ? "dark:bg-primary-300 cursor-not-allowed" : "dark:bg-primary-300 dark:hover:bg-primary-500 dark:text-black font-semibold  border-2 bg-[#0202FF] hover:bg-[#3232ff]"}`}
                            disabled={loading} onClick={handleCalculate}>
                            {loading ? "Calculating..." : "Calculate"}
                        </button>
                    </div>

                    <div>
                        {result && (
                            <div className="mt-6 bg-gray-800 p-6 rounded-lg text-white">
                                <h2 className="text-xl font-bold mb-4">Formula results Mifflin-St Jeor</h2>
                                <p><strong>Maintenance:</strong> {result.maintenance.toFixed(0)} kcal</p>
                                <p><strong>Deficit (to lose fat):</strong> {result.deficit.toFixed(0)} kcal</p>
                                <p><strong>Surplus (to gain muscle):</strong> {result.plus.toFixed(0)} kcal</p>
                            </div>
                        )}
                    </div>

                </div>

                {/* Modal loading */}
                {loading && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                        <div className='bg-gray-800 p-8 rounded-2xl shadow-xl text-center'>
                            <p className='text-xl font-bold mb-4 text-white'>Calculating...</p>
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
