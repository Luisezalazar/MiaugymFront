import { Minus, Check } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export const SeeRoutine = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const { routine } = location.state || {}

    const [count, setCount] = useState(
        routine?.routineExercise?.reduce((acc, _, index) => {
            acc[index] = 0
            return acc
        }, {}) || {}
    )

    const [completed, setCompleted] = useState(
        routine?.routineExercise?.reduce((acc, _, index) => {
            acc[index] = false
            return acc
        }, {}) || {}
    )

    const [timeLeft, setTimeLeft] = useState(routine?.duration || 0)
    const [isRunning, setIsRunning] = useState(false)
    const timeRef = useRef(null)

    const [countSeries, setCountSeries] = useState(0)
    const timeOut = useRef(null)

    const handleIncrease = () => setCountSeries(prev => prev + 1)
    const handleDecrease = () => setCountSeries(prev => (prev > 0 ? prev - 1 : 0))
    const handleReset = () => {
        timeOut.current = setTimeout(() => setCountSeries(0), 500)
    }
    const stopTimeOut = () => clearTimeout(timeOut.current)

    const increment = (index) => {
        const newValue = count[index] + 1 > routine.routineExercise[index].series
            ? 0
            : count[index] + 1
        setCount({ ...count, [index]: newValue })
    }

    const handleComplete = (index) => {
        setCompleted(prev => ({ ...prev, [index]: !prev[index] }))
    }

    // nueva función para reiniciar el timer si ya está en 0
    const startTimer = () => {
        if (timeLeft === 0) {
            setTimeLeft(routine.duration)
        }
        setIsRunning(true)
    }

    useEffect(() => {
        if (!isRunning) return
        if ("vibrate" in navigator) {
            navigator.vibrate(50)
        }

        timeRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timeRef.current)
                    timeRef.current = null
                    setIsRunning(false)

                    if ("vibrate" in navigator) {
                        navigator.vibrate([300, 100, 300])
                    }
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => {
            if (timeRef.current) {
                clearInterval(timeRef.current)
                timeRef.current = null
            }
        }
    }, [isRunning])

    return (
        <div className="max-w-4xl mx-auto p-6 text-center">
            <h1 className='border rounded-lg text-3xl font-bold text-black dark:text-white mb-8'>
                {routine.name}
            </h1>

            {/* Chronometer */}
            {routine.duration &&
                <>
                    <h2 className="text-lg font-semibold text-white">Rest</h2>
                    <div className="mb-6 flex items-center justify-center gap-4">
                        {/* Reset */}
                        <button
                            onClick={() => { setTimeLeft(routine.duration); setIsRunning(false) }}
                            className='dark:bg-primary-300 dark:hover:bg-primary-600 px-2 py-1 rounded-lg text-white dark:text-black border-2 font-semibold'>
                            Reset
                        </button>

                        {/* Timer display */}
                        <div
                            className="text-3xl font-mono font-bold text-white"
                            translate="no"
                        >
                            {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                            {String(timeLeft % 60).padStart(2, "0")}
                        </div>

                        {/* Pause / Resume */}
                        <button
                            onClick={() => setIsRunning(prev => !prev)}
                            className='dark:bg-primary-300 dark:hover:bg-primary-600 px-2 py-1 rounded-lg text-white dark:text-black font-semibold border-2'>
                            {isRunning ? "Pause" : "Resume"}
                        </button>
                    </div>
                </>
            }

            {/* Serie buttons */}
            <div className='flex gap-2 justify-end'>
                <button
                    translate='no'
                    type='button'
                    onClick={() => { handleIncrease(); startTimer() }}
                    onMouseUp={stopTimeOut}
                    onTouchEnd={stopTimeOut}
                    onMouseLeave={stopTimeOut}
                    className='dark:bg-primary-300 dark:text-black dark:border-2 rounded-lg px-4 py-2 mb-4 dark:hover:bg-primary-500 transition cursor-pointer mt-4 font-bold bg-[#0202FF] hover:bg-[#3232ff] text-white'>
                    Serie: {countSeries}
                </button>
                <button
                    type='button'
                    onClick={handleDecrease}
                    onMouseDown={handleReset}
                    onTouchStart={handleReset}
                    className='dark:bg-primary-300 dark:border-2 dark:text-zinc-950 rounded-lg px-2 py-2 mb-4 dark:hover:bg-primary-500 transition cursor-pointer mt-4 bg-[#0202FF] hover:bg-[#3232ff] text-white font-bold'>
                    <Minus size={15} />
                </button>
            </div>

            {/* Exercises table */}
            <div className='overflow-x-auto'>
                {routine.routineExercise && routine.routineExercise.length > 0 ? (
                    <table className="w-full border-collapse border-black">
                        <thead>
                            <tr className="dark:bg-black bg-[#0202FF] text-white">
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Count</th>
                                <th className="px-4 py-2 text-left">Weight</th>
                                <th className="px-4 py-2 text-left">Rep</th>
                                <th className="px-4 py-2 text-left">Ser</th>
                            </tr>
                        </thead>
                        <tbody>
                            {routine.routineExercise.map((e, index) => (
                                <tr key={index} className="border-b border-gray-700">
                                    <td className="px-2 py-2 text-white flex">
                                        <button
                                            type='button'
                                            className='font-bold dark:bg-primary-300 dark:text-zinc-950 dark:border-2 bg-[#0202FF] hover:bg-[#3232ff] rounded-lg text-white px-5 py-1 dark:hover:bg-primary-500 transition cursor-pointer'
                                            onClick={() => { increment(index); startTimer() }}
                                        >
                                            {e.name}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleComplete(index)}
                                            className={`px-2 py-1 rounded-lg font-bold m-2
                                                ${completed[index] ? 'bg-green-600 text-white' : 'bg-neutral-600 text-neutral-200 hover:bg-neutral-500'}`}>
                                            {completed[index] ? <Check /> : '⭕'}
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">{count[index]}</td>
                                    <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">{e.weight}</td>
                                    <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">{e.repetitions}</td>
                                    <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">{e.series}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-400 text-center">There is no data.</p>
                )}
            </div>

            <Link to={"/myRoutine"}>
                <button
                    type='button'
                    className='dark:bg-primary-300 dark:text-zinc-950 dark:border-2 dark:border-black rounded-lg px-4 py-2 dark:hover:bg-primary-700 bg-[#0202FF] hover:bg-[#3232ff] text-white transition cursor-pointer mt-4 font-semibold text-center'>
                    Back
                </button>
            </Link>
        </div>
    )
}