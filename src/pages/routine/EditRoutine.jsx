import { BookOpen, Plus, Trash, ArrowUp, ArrowDown, X } from 'lucide-react';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth'
import { ExercisePicker } from '../../component/ExercisePicker'
import { ExerciseFrame } from '../../component/ExerciseFrame'
import { useLang } from '../../context/language'
import { BASE_URL } from '../../services/apiConfig'

export const EditRoutine = () => {

    const { state } = useLocation()
    const navigate = useNavigate()
    const { user, getToken } = useAuth()
    const { t } = useLang()

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
            repetitions: ex.repetitions,
            // Sin estos dos campos, guardar la rutina borraba el vinculo
            // al catalogo y con el las ilustraciones.
            exerciseId: ex.exerciseId ?? null,
            slug: ex.exercise?.slug ?? null
        })) || [{ name: "", weight: "", series: "", repetitions: "", exerciseId: null, slug: null }]
    )
    // Indice de la fila que abrio el catalogo (null = cerrado)
    const [pickerFor, setPickerFor] = useState(null)

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
        setExercises([...exercises, { name: "", weight: "", series: "", repetitions: "", exerciseId: null, slug: null }])
    }

    const pickFromCatalog = (index, exercise) => {
        const next = [...exercises]
        next[index] = { ...next[index], name: exercise.name, exerciseId: exercise.id, slug: exercise.slug }
        setExercises(next)
    }

    const unlinkExercise = (index) => {
        const next = [...exercises]
        next[index] = { ...next[index], exerciseId: null, slug: null }
        setExercises(next)
    }

    const removeExercise = (index) => {
        const newExercises = exercises.filter((_, i) => i !== index)
        setExercises(newExercises)
    }

    const moveExercise = (fromIndex, direction) => {
        const toIndex = fromIndex + direction
        if (toIndex < 0 || toIndex >= exercises.length) return
        const newExercises = [...exercises]
        const [movedExercise] = newExercises.splice(fromIndex, 1)
        newExercises.splice(toIndex, 0, movedExercise)
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
                console.log("Error updating routine: ", result)
            }
        } catch (error) {
            console.error("Error updating routine: ", error)
            setLoading(false)
        }
    }

    return (
        <div className='px-6 py-8'>
            <form onSubmit={handleSubmit} className='max-w-4xl mx-auto p-6 bg-raised rounded-lg shadow-lg'>
                {/* Name routine */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2 text-ink text-center">{t('form.routineName')}</label>
                    <input
                        type="text"
                        value={nameRoutine}
                        onChange={(e) => setNameRoutine(e.target.value)}
                        className='w-full px-3 py-2.5 rounded-lg bg-sunken border border-line text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition'
                        placeholder={t('form.routineNamePlaceholder')}
                        required
                    />
                </div>


                {/* Checkbox chronometer */}
                <div className='mb-6 flex items-center gap-3'>
                    <input type="checkbox" checked={useTimer} onChange={(e) => setUseTimer(e.target.checked)} />
                    <label className='font-semibold text-ink'>{t('form.useTimer')}</label>
                </div>

                {/* If useTimer */}
                {useTimer && (
                    <div className="mb-6">
                        <label className="block font-semibold mb-2 text-ink">{t('form.duration')}</label>
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
                            className="w-20 px-2 py-2 text-center font-semibold text-ink border rounded-lg focus:ring-2 focus:ring-primary-500"
                            inputMode="numeric"
                        />
                    </div>
                )}

                {/* Ejercicios: mismas tarjetas que en CreateRoutine, con el
                    reordenar y el borrar en la cabecera de cada una. */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="font-semibold text-ink">{t('form.exercises')}</h2>
                        <span className="text-sm text-ink-muted tabular-nums">{exercises.length}</span>
                    </div>

                    {exercises.map((exercise, index) => (
                        <div key={index} className="bg-sunken border border-line rounded-xl p-4">
                            <div className="flex items-center justify-between gap-2 mb-3">
                                <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                                    {t('form.exerciseN', { n: index + 1 })}
                                </span>
                                <div className="flex items-center gap-0.5">
                                    <button type="button" onClick={() => moveExercise(index, -1)}
                                        disabled={index === 0} aria-label={t('form.moveUp')}
                                        className='p-1.5 rounded-md text-ink-faint hover:text-ink hover:bg-raised
                                            transition disabled:opacity-30 disabled:hover:bg-transparent'>
                                        <ArrowUp size={18} />
                                    </button>
                                    <button type="button" onClick={() => moveExercise(index, 1)}
                                        disabled={index === exercises.length - 1} aria-label={t('form.moveDown')}
                                        className='p-1.5 rounded-md text-ink-faint hover:text-ink hover:bg-raised
                                            transition disabled:opacity-30 disabled:hover:bg-transparent'>
                                        <ArrowDown size={18} />
                                    </button>
                                    <button type='button' onClick={() => removeExercise(index)}
                                        disabled={exercises.length === 1} aria-label={t('form.removeExercise')}
                                        className='p-1.5 rounded-md text-ink-faint hover:text-danger hover:bg-danger-soft
                                            transition disabled:opacity-30 disabled:hover:bg-transparent'>
                                        <Trash size={18} />
                                    </button>
                                </div>
                            </div>

                            <label className='block text-sm font-medium mb-1.5 text-ink'>{t('form.name')}</label>

                            {exercise.slug ? (
                                <div className='flex items-center gap-3 px-3 py-2 rounded-lg bg-raised border border-accent'>
                                    <ExerciseFrame slug={exercise.slug} size={40} />
                                    <span className='flex-1 min-w-0 font-medium text-ink truncate'>{exercise.name}</span>
                                    <button type='button' onClick={() => unlinkExercise(index)}
                                        aria-label={t('form.unlink')}
                                        title={t('form.unlink')}
                                        className='p-1.5 rounded-md text-ink-faint hover:text-ink hover:bg-sunken transition'>
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <div className='flex gap-2'>
                                    <input type="text" value={exercise.name}
                                        onChange={(e) => handleChange(index, "name", e.target.value)}
                                        className='flex-1 min-w-0 px-3 py-2.5 rounded-lg bg-sunken border border-line text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition'
                                        placeholder={t('form.namePlaceholder')} />
                                    <button type='button' onClick={() => setPickerFor(index)}
                                        className='flex items-center gap-1.5 px-3 py-2.5 rounded-lg shrink-0 text-sm font-medium
                                            border border-line text-ink-muted hover:text-accent hover:border-accent transition'>
                                        <BookOpen size={16} />
                                        <span className='hidden sm:inline'>{t('form.catalog')}</span>
                                    </button>
                                </div>
                            )}

                            <div className='grid grid-cols-3 gap-2 mt-3'>
                                <div>
                                    <label className='block text-sm font-medium mb-1.5 text-ink'>{t('form.weight')} (kg)</label>
                                    <div className='relative'>
                                        <input type="number" value={exercise.weight}
                                            onChange={(e) => handleChange(index, "weight", e.target.value)}
                                            className='w-full px-3 py-2.5 rounded-lg bg-sunken border border-line text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition pr-9'
                                            placeholder='0' />
                                        {/* La unidad va dentro del campo; pr-9 evita que el numero la pise */}
                                        <span aria-hidden='true'
                                            className='absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-faint pointer-events-none'>
                                            kg
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label className='block text-sm font-medium mb-1.5 text-ink'>{t('form.series')}</label>
                                    <input type="number" value={exercise.series}
                                        onChange={(e) => handleChange(index, "series", e.target.value)}
                                        className='w-full px-3 py-2.5 rounded-lg bg-sunken border border-line text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition' placeholder='0' />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium mb-1.5 text-ink'>{t('form.reps')}</label>
                                    <input type="text" value={exercise.repetitions}
                                        onChange={(e) => handleChange(index, "repetitions", e.target.value)}
                                        className='w-full px-3 py-2.5 rounded-lg bg-sunken border border-line text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition' placeholder='8-10' />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button type='button' onClick={addExercise}
                    className='w-full flex items-center justify-center gap-2 mt-3 px-4 py-2.5
                        rounded-lg border border-dashed border-line text-ink-muted
                        hover:text-accent hover:border-accent transition'>
                    <Plus size={18} /> {t('form.addExercise')}
                </button>

                {/* Save button */}
                <div className="mt-6 text-right">
                    <button
                        type='submit'
                        className='w-full mt-2 px-4 py-2.5 rounded-lg font-semibold bg-accent text-on-accent hover:bg-accent-hover transition disabled:opacity-60 disabled:cursor-not-allowed'
                        disabled={loading}
                    >
                        {loading ? t('form.updatingRoutine') : t('form.updateRoutine')}
                    </button>
                </div>
            </form>

            <ExercisePicker
                open={pickerFor !== null}
                onClose={() => setPickerFor(null)}
                onSelect={(ex) => pickFromCatalog(pickerFor, ex)}
            />

            {/* Modal loading */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-raised border border-line p-8 rounded-2xl shadow-xl text-center min-w-[16rem]">
                        <p className="text-xl font-bold mb-4 text-ink">{t('form.updatingRoutine')}</p>
                        <div className="progress-track" />
                    </div>
                </div>
            )}
        </div>
    )
}
