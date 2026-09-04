import React, { useState } from 'react'
import { useLang } from '../../context/language'

export const Calculator = () => {

    const [loading, setLoading] = useState(false)
    const { t } = useLang()
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
                <h1 className='text-center text-4xl mb-6 font-semibold'>{t('calc.title')}</h1>
                <div className='max-w-xl mx-auto p-6 bg-raised border border-line rounded-lg shadow-lg '>
                    <div className='mb-6'>

                        {/* Gender */}
                        <label className='block font-semibold mb-2 text-ink'>{t('calc.gender')}</label>

                        <select name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}
                            className='w-full px-3 py-2.5 rounded-lg bg-sunken border border-line text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition' required>
                            <option value="">{t('calc.select')}</option>
                            <option value="male">{t('calc.male')}</option>
                            <option value="female">{t('calc.female')}</option>
                        </select>

                        {/* Age */}
                        <label className='block font-semibold mb-2 mt-4 text-ink'>{t('calc.age')}</label>
                        <input type="number" name='age' value={age} onChange={(e) => setAge(e.target.value)}
                            className='w-full px-3 py-2.5 rounded-lg bg-sunken border border-line text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition' required />

                        {/* Weight */}
                        <label className='block font-semibold mb-2 mt-4 text-ink'>{t('calc.weight')}</label>
                        <input type="number" name='weight' value={weight} onChange={(e) => setWeight(e.target.value)}
                            className='w-full px-3 py-2.5 rounded-lg bg-sunken border border-line text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition' required />

                        {/* Height */}
                        <label className='block font-semibold mb-2 mt-4 text-ink'>{t('calc.height')}</label>
                        <input type="number" name='height' value={height} onChange={(e) => setHeight(e.target.value)}
                            className='w-full px-3 py-2.5 rounded-lg bg-sunken border border-line text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition' required />

                        <label className='block font-semibold mb-2 mt-4 text-ink'>{t('calc.activity')}</label>
                        <select name="activity" id="activity" value={activity} onChange={(e) => setActivity(e.target.value)}
                            className='w-full px-3 py-2.5 rounded-lg bg-sunken border border-line text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition' required>
                            <option value="">{t('calc.select')}</option>
                            <option value="sedentary">{t('calc.sedentary')}</option>
                            <option value="light">{t('calc.light')}</option>
                            <option value="moderate">{t('calc.moderate')}</option>
                            <option value="intense">{t('calc.intense')}</option>
                            <option value="veryIntense">{t('calc.veryIntense')}</option>
                        </select>

                    </div>

                    {/* Save button */}
                    <button type='submit'
                        className='w-full mt-6 px-4 py-2.5 rounded-lg font-semibold
                            bg-accent text-on-accent hover:bg-accent-hover transition
                            disabled:opacity-60 disabled:cursor-not-allowed'
                        disabled={loading} onClick={handleCalculate}>
                        {loading ? t('calc.calculating') : t('calc.calculate')}
                    </button>

                </div>

                {/* Resultados: el numero es el producto de la pantalla, no una linea de texto */}
                {result && (
                    <div className='max-w-xl mx-auto mt-6'>
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                            {[
                                { label: t('calc.maintenance'), value: result.maintenance, hint: t('calc.keepWeight'), primary: true },
                                { label: t('calc.deficit'), value: result.deficit, hint: t('calc.toLoseFat') },
                                { label: t('calc.surplus'), value: result.plus, hint: t('calc.toGainMuscle') },
                            ].map((r) => (
                                <div key={r.label}
                                    className={`rounded-xl p-4 border text-center
                                        ${r.primary
                                            ? 'bg-accent-soft border-accent'
                                            : 'bg-raised border-line'}`}>
                                    <div className='text-xs font-semibold uppercase tracking-wider text-ink-faint'>
                                        {r.label}
                                    </div>
                                    <div className={`text-3xl font-bold tabular-nums mt-1.5
                                        ${r.primary ? 'text-accent' : 'text-ink'}`}>
                                        {r.value.toFixed(0)}
                                    </div>
                                    <div className='text-xs text-ink-muted mt-1'>kcal · {r.hint}</div>
                                </div>
                            ))}
                        </div>
                        <p className='text-xs text-ink-faint text-center mt-3'>
                            {t('calc.formula')}
                        </p>
                    </div>
                )}

                {/* Modal loading */}
                {loading && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'>
                        <div className='bg-raised border border-line p-8 rounded-2xl shadow-xl text-center min-w-[16rem]'>
                            <p className='text-xl font-bold mb-4 text-ink'>{t('calc.calculating')}</p>
                            <div className="progress-track" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
