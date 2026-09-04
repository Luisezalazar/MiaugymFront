import { Minus, Check, ArrowLeft, Plus, RotateCcw, Pause, Play, LayoutList, Focus } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ExerciseFrame } from '../../component/ExerciseFrame'
import { formatWeight } from '../../services/format'
import { ExerciseFocus } from '../../component/ExerciseFocus'
import { useLang } from '../../context/language'

export const SeeRoutine = () => {

    const location = useLocation()
    const { routine } = location.state || {}
    const { t } = useLang()

    const exercises = routine?.routineExercise || []

    const [count, setCount] = useState(
        exercises.reduce((acc, _, index) => {
            acc[index] = 0
            return acc
        }, {})
    )

    const [completed, setCompleted] = useState(
        exercises.reduce((acc, _, index) => {
            acc[index] = false
            return acc
        }, {})
    )

    const [timeLeft, setTimeLeft] = useState(routine?.duration || 0)
    const [isRunning, setIsRunning] = useState(false)
    const timeRef = useRef(null)

    // 'list' = todos los ejercicios; 'focus' = uno por pantalla.
    const [view, setView] = useState(() => localStorage.getItem('routineView') || 'list')
    const changeView = (v) => { setView(v); localStorage.setItem('routineView', v) }

    const [countSeries, setCountSeries] = useState(0)
    const timeOut = useRef(null)

    const handleIncrease = () => setCountSeries(prev => prev + 1)
    const handleDecrease = () => setCountSeries(prev => (prev > 0 ? prev - 1 : 0))
    const handleReset = () => {
        timeOut.current = setTimeout(() => setCountSeries(0), 500)
    }
    const stopTimeOut = () => clearTimeout(timeOut.current)

    const increment = (index) => {
        const maxSeries = parseInt(exercises[index].series);
        const newValue = count[index] + 1;

        let updatedValue = newValue;
        if (newValue > maxSeries) updatedValue = 0;

        setCount(prev => ({ ...prev, [index]: updatedValue }));

        setCompleted(prev => ({
            ...prev,
            [index]: updatedValue === maxSeries ? true : updatedValue === 0 ? false : prev[index]
        }));
    };

    const handleComplete = (index) => {
        setCompleted(prev => ({ ...prev, [index]: !prev[index] }))
    }

    //Reset 0 chronometer
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

    // Si se entra por URL directa no hay state: antes esto reventaba en routine.name
    if (!routine) {
        return (
            <div className="max-w-md mx-auto px-4 py-16 text-center">
                <h1 className="text-lg font-semibold text-ink">{t('train.notFound')}</h1>
                <p className="text-sm text-ink-muted mt-1.5">
                    {t('train.notFoundText')}
                </p>
                <Link to="/myRoutine"
                    className="inline-flex items-center gap-2 mt-6 bg-accent text-on-accent
                      hover:bg-accent-hover px-4 py-2.5 rounded-lg font-semibold transition">
                    <ArrowLeft size={18} /> {t('train.back')}
                </Link>
            </div>
        )
    }

    const doneCount = Object.values(completed).filter(Boolean).length
    const progress = exercises.length ? (doneCount / exercises.length) * 100 : 0
    const restTotal = routine.duration || 0
    const restProgress = restTotal ? (timeLeft / restTotal) * 100 : 0

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">

            {/* Encabezado */}
            <div className="flex items-start justify-between gap-4 mb-5">
                <div className="min-w-0">
                    <Link to="/myRoutine"
                        className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition mb-2">
                        <ArrowLeft size={16} /> {t('nav.myRoutine')}
                    </Link>
                    <h1 className='text-2xl sm:text-3xl font-bold tracking-tight truncate'>
                        {routine.name}
                    </h1>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    {/* Conmutador de vista */}
                    <div className="flex p-0.5 rounded-lg bg-sunken border border-line" role="group" aria-label={t('train.view')}>
                        <button type="button" onClick={() => changeView('list')}
                            aria-pressed={view === 'list'} aria-label={t('train.viewList')}
                            title={t('train.viewList')}
                            className={`p-1.5 rounded-md transition
                                ${view === 'list' ? 'bg-accent text-on-accent' : 'text-ink-muted hover:text-ink'}`}>
                            <LayoutList size={18} />
                        </button>
                        <button type="button" onClick={() => changeView('focus')}
                            aria-pressed={view === 'focus'} aria-label={t('train.viewFocus')}
                            title={t('train.viewFocus')}
                            className={`p-1.5 rounded-md transition
                                ${view === 'focus' ? 'bg-accent text-on-accent' : 'text-ink-muted hover:text-ink'}`}>
                            <Focus size={18} />
                        </button>
                    </div>

                    <div className="text-right">
                        <div className="text-2xl font-bold tabular-nums text-ink">
                            {doneCount}<span className="text-ink-faint">/{exercises.length}</span>
                        </div>
                        <div className="text-xs text-ink-muted">{t('train.done')}</div>
                    </div>
                </div>
            </div>

            {/* Progreso general de la sesion */}
            {exercises.length > 0 && (
                <div className="h-1.5 w-full bg-sunken rounded-full overflow-hidden mb-6">
                    <div className="h-full bg-success transition-all duration-300"
                        style={{ width: `${progress}%` }} />
                </div>
            )}

            {/* Cronometro de descanso: pegado arriba, legible a un brazo de distancia */}
            {restTotal > 0 && (
                <div className="sticky top-16 z-30 mb-6 bg-raised border border-line rounded-xl p-4">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <div className="text-xs font-semibold uppercase tracking-wider text-ink-faint">{t('train.rest')}</div>
                            <div
                                className={`text-4xl sm:text-5xl font-mono font-bold tabular-nums leading-none mt-1
                                    ${isRunning ? 'text-accent' : 'text-ink'}`}
                                translate="no"
                            >
                                {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                                {String(timeLeft % 60).padStart(2, "0")}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => { setTimeLeft(routine.duration); setIsRunning(false) }}
                                aria-label={t('train.resetTimer')}
                                className='p-2.5 rounded-lg border border-line text-ink-muted
                                  hover:text-ink hover:bg-sunken transition'>
                                <RotateCcw size={20} />
                            </button>
                            <button
                                onClick={() => setIsRunning(prev => !prev)}
                                aria-label={isRunning ? t('train.pauseTimer') : t('train.resumeTimer')}
                                className='p-2.5 rounded-lg bg-accent text-on-accent hover:bg-accent-hover transition'>
                                {isRunning ? <Pause size={20} /> : <Play size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Barra que vacia: se lee el descanso restante sin leer numeros */}
                    <div className="h-1 w-full bg-sunken rounded-full overflow-hidden mt-3">
                        <div className="h-full bg-accent transition-all duration-1000 ease-linear"
                            style={{ width: `${restProgress}%` }} />
                    </div>
                </div>
            )}

            {/* Contador global de series */}
            <div className='flex items-center justify-between gap-3 mb-5
              bg-raised border border-line rounded-xl px-4 py-3'>
                <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-ink-faint">{t('train.totalSets')}</div>
                    <div className="text-2xl font-bold tabular-nums text-ink" translate='no'>{countSeries}</div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type='button'
                        onClick={handleDecrease}
                        onMouseDown={handleReset}
                        onTouchStart={handleReset}
                        onMouseUp={stopTimeOut}
                        onTouchEnd={stopTimeOut}
                        onMouseLeave={stopTimeOut}
                        aria-label={t('train.decreaseSet')}
                        className='p-2.5 rounded-lg border border-line text-ink-muted
                          hover:text-ink hover:bg-sunken transition'>
                        <Minus size={20} />
                    </button>
                    <button
                        translate='no'
                        type='button'
                        onClick={() => { handleIncrease(); startTimer() }}
                        aria-label={t('train.addSet')}
                        className='flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-semibold
                          bg-accent text-on-accent hover:bg-accent-hover transition'>
                        <Plus size={18} /> {t('train.addSet')}
                    </button>
                </div>
            </div>

            {/* Vista de enfoque: un ejercicio por pantalla */}
            {view === 'focus' && exercises.length > 0 && (
                <ExerciseFocus
                    exercises={exercises}
                    count={count}
                    completed={completed}
                    onIncrement={(i) => { increment(i); startTimer() }}
                    onToggleComplete={handleComplete}
                />
            )}

            {/* Ejercicios: tarjetas en vez de tabla, sin scroll horizontal en el gimnasio */}
            {view === 'list' && exercises.length > 0 ? (
                <ul className='space-y-3'>
                    {exercises.map((e, index) => {
                        const total = parseInt(e.series) || 0
                        const done = count[index] || 0
                        const isDone = completed[index]

                        return (
                            <li key={index}
                                className={`bg-raised border rounded-xl p-4 transition
                                    ${isDone ? 'border-success' : 'border-line'}`}>

                                <div className='flex items-start justify-between gap-3'>
                                    <div className='min-w-0'>
                                        <h2 className={`font-semibold truncate
                                            ${isDone ? 'text-ink-muted line-through' : 'text-ink'}`}>
                                            {e.name}
                                        </h2>

                                        {/* Las 3 poses del movimiento, si el ejercicio
                                            viene del catalogo */}
                                        {e.exercise?.slug && (
                                            <div className='flex items-center gap-1 mt-2'>
                                                {Array.from({ length: e.exercise.frameCount || 3 }).map((_, f) => (
                                                    <ExerciseFrame
                                                        key={f}
                                                        slug={e.exercise.slug}
                                                        index={f + 1}
                                                        size={56}
                                                        tone={isDone ? 'ink' : 'accent'}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        <div className='flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-ink-muted'>
                                            <span className='tabular-nums'>{formatWeight(e.weight)}</span>
                                            <span className='text-ink-faint'>·</span>
                                            <span className='tabular-nums'>{e.series} × {e.repetitions}</span>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleComplete(index)}
                                        aria-label={isDone ? t('train.markUndone') : t('train.markDone')}
                                        className={`shrink-0 p-2 rounded-lg border transition
                                            ${isDone
                                                ? 'bg-success-soft border-success text-success'
                                                : 'border-line text-ink-faint hover:text-ink hover:bg-sunken'}`}>
                                        <Check size={20} />
                                    </button>
                                </div>

                                {/* Progreso de series: puntos + boton grande para el pulgar */}
                                <div className='flex items-center justify-between gap-3 mt-4'>
                                    <div className='flex items-center gap-1.5 flex-wrap'>
                                        {Array.from({ length: total }).map((_, i) => (
                                            <span key={i}
                                                className={`h-2.5 w-2.5 rounded-full transition
                                                    ${i < done ? 'bg-accent' : 'bg-sunken border border-line'}`} />
                                        ))}
                                        <span className='ml-1.5 text-sm tabular-nums text-ink-muted'>
                                            {done}/{total}
                                        </span>
                                    </div>

                                    <button
                                        type='button'
                                        onClick={() => { increment(index); startTimer() }}
                                        className='px-4 py-2 rounded-lg text-sm font-semibold shrink-0
                                          bg-accent text-on-accent hover:bg-accent-hover transition'
                                    >
                                        + {t('train.set')}
                                    </button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            ) : exercises.length === 0 ? (
                <p className="text-center text-ink-muted py-12">{t('train.noData')}</p>
            ) : null}
        </div>
    )
}
