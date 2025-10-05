import { Plus, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'

export const EditRoutine = () => {

    const { state } = useLocation()
    const navigate = useNavigate()
    const { user, getToken } = useAuth()
    const BASE_URL = import.meta.env.VITE_BASE_URL

    //Routine received
    const routine = state?.routine;

    //Preloaded values
    const [nameRoutine, setNameRoutine] = useState(routine?.name || "")
    const [exercises, setExercises] = useState(
        routine?.routineExercise?.map(ex => ({
            id: ex.id,
            name: ex.name,
            weight: ex.weight,
            series: ex.series,
            repetitions: ex.repetitions
        })) || [{ name: "", weight: "", series: "", repetitions: "" }]
    )
    //Chronometer
    const [useTimer, setUseTimer] = useState(!!routine?.duration)

    const initialDuration = (() => {
        if (!routine?.duration) return 0
        if (typeof routine.duration === "string") {
            const [mm, ss] = routine.duration.split(":").map(Number)
            return (mm * 60) + ss
        }
        return routine.duration
    })()

    const [duration, setDuration] = useState(initialDuration)

    const [loading, setLoading] = useState(false)

    const handleChange = (index, field, value) => {
        const newExercises = [...exercises]
        newExercises[index][field] = value
        setExercises(newExercises)
    }

    const addExercise = () => {
        setExercises([...exercises, { name: "", weight: "", series: "", repetitions: "" }])
    }

    const removeExercise = (index) => {
        const newExercises = exercises.filter((_, i) => i !== index)
        setExercises(newExercises)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const token = getToken()
        if (!user || !token) {
            console.error("User not found")
            setLoading(false)
            return;
        }
        const data = {
            id: routine.id,
            name: nameRoutine,
            personId: user.id,
            routineExercise: exercises,
            duration: useTimer ? duration : null
        }
        try {
            const response = await fetch(`${BASE_URL}/routine/updateRoutine/${routine.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            const result = await response.json()
            console.log(result)
            if (response.ok) {
                setTimeout(() => {
                    setLoading(false)
                    navigate("/myRoutine")
                }, 1000)
            } else {
                setLoading(false)
                console.log("Error updating routine: ", error)
            }
        } catch (error) {
            console.error("Error updating routine: ", error)
            setLoading(false)
        }
    }

    return (
        <div className='px-6 py-8'>
            <form onSubmit={handleSubmit} className='max-w-4xl mx-auto p-6 dark:bg-neutral-900 bg-[#0202FF] rounded-lg shadow-lg'>
                {/* Name routine */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2 text-white text-center">Edit routine name</label>
                    <input
                        type="text"
                        value={nameRoutine}
                        onChange={(e) => setNameRoutine(e.target.value)}
                        className='w-full px-4 py-2 text-white border rounded-lg focus:ring-2 focus:ring-primary-500'
                        placeholder='Name routine'
                        required
                    />
                </div>


                {/* Checkbox chronometer */}
                <div className='mb-6 flex items-center gap-3'>
                    <input type="checkbox" checked={useTimer} onChange={(e) => setUseTimer(e.target.checked)} />
                    <label className='font-semibold text-white'>Do you want add a chronometer?</label>
                </div>

                {/* If useTimer */}
                {useTimer && (
                    <div className="mb-6">
                        <label className="block font-semibold mb-2 text-white">Duration (MM:SS)</label>
                        <input
                            type="text"
                            value={`${String(Math.floor(duration / 60)).padStart(2, "0")}:${String(duration % 60).padStart(2, "0")}`}
                            onChange={(e) => {
                                let raw = e.target.value.replace(/\D/g, "")
                                let digits = raw.split("")
                                if (digits.length > 4) digits = digits.slice(-4)
                                digits = digits.join("").padStart(4, "0")
                                const mins = parseInt(digits.slice(0, -2), 10)
                                let secs = parseInt(digits.slice(-2), 10)
                                if (secs > 59) secs = 59
                                setDuration(mins * 60 + secs)
                            }}
                            placeholder="00:00"
                            className="w-20 px-2 py-2 text-center font-semibold text-white border rounded-lg focus:ring-2 focus:ring-primary-500"
                            inputMode="numeric"
                        />
                    </div>
                )}

                {/* Table exercises */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse ">
                        <thead>
                            <tr className='dark:bg-zinc-950 drop-shadow-xs dark:drop-shadow-primary-300 bg-[#0000b8] text-white'>
                                <th className='px-4 py-2 text-left'>Exercise</th>
                                <th className='px-4 py-2 text-left'>Weight</th>
                                <th className='px-4 py-2 text-left'>Series</th>
                                <th className='px-4 py-2 text-left'>Repetitions</th>
                                <th className='px-4 py-2 text-left'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exercises.map((exercise, index) => (
                                <tr key={index} className='border-b text-white'>
                                    <td className='px-4 py-2'>
                                        <input
                                            type="text"
                                            value={exercise.name}
                                            onChange={(e) => handleChange(index, "name", e.target.value)}
                                            className='w-full px-2 py-1 border rounded-lg'
                                            placeholder='Press'
                                        />
                                    </td>
                                    <td className='px-4 py-2'>
                                        <input
                                            type="number"
                                            value={exercise.weight}
                                            onChange={(e) => handleChange(index, "weight", e.target.value)}
                                            className='w-full px-2 py-1 border rounded-lg'
                                            placeholder='0'
                                        />
                                    </td>
                                    <td className='px-4 py-2'>
                                        <input
                                            type="number"
                                            value={exercise.series}
                                            onChange={(e) => handleChange(index, "series", e.target.value)}
                                            className='w-full px-2 py-1 border rounded-lg'
                                            placeholder='0'
                                        />
                                    </td>
                                    <td className='px-4 py-2'>
                                        <input
                                            type="text"
                                            value={exercise.repetitions}
                                            onChange={(e) => handleChange(index, "repetitions", e.target.value)}
                                            className='w-full px-2 py-1 border rounded-lg'
                                            placeholder='0'
                                        />
                                    </td>
                                    <td className='px-4 py-4 text-center'>
                                        <button
                                            type='button'
                                            onClick={() => removeExercise(index)}
                                            className='dark:text-primary-300 dark:hover:text-primary-500 hover:text-black'
                                        >
                                            <Trash size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Add button */}
                <div className="flex justify-end mt-4">
                    <button
                        type='button'
                        onClick={addExercise}
                        className='flex items-center dark:bg-primary-300 dark:text-black border-2 font-semibold text-white px-4 py-2 rounded-lg dark:hover:bg-primary-500 hover:bg-[#0202b0] transition'
                    >
                        <Plus className='mr-1' size={20} />
                    </button>
                </div>

                {/* Save button */}
                <div className="mt-6 text-right">
                    <button
                        type='submit'
                        className={`px-4 py-2 rounded-lg transition text-white ${loading ? "bg-primary-500 cursor-not-allowed" : "dark:bg-primary-300 dark:text-black border-2 font-semibold dark:hover:bg-primary-500 hover:bg-[#0202b0]"}`}
                        disabled={loading}
                    >
                        {loading ? "Updating routine..." : "Update"}
                    </button>
                </div>
            </form>

            {/* Modal loading */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-neutral-800 p-8 rounded-2xl shadow-xl text-center">
                        <p className="text-xl font-bold mb-4 text-white">Updating routine...</p>
                        <div className="w-64 bg-neutral-200 rounded-full h-4 overflow-hidden">
                            <div className="bg-primary-600 h-4 animate-pulse w-1/2"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
