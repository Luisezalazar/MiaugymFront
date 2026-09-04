import React, { useEffect, useRef, useState } from 'react'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { ExerciseFrame } from './ExerciseFrame'
import { formatWeight } from '../services/format'
import { useLang } from '../context/language'

/*
  Vista de enfoque: un ejercicio por pantalla.

  El desplazamiento es scroll-snap nativo, no una libreria de carrusel: en el
  celular se arrastra con el dedo con la inercia del sistema, y en escritorio
  quedan las flechas. Al completar un ejercicio pasa solo al siguiente.
*/

/** Cicla los 3 frames para que se vea el movimiento, no una pose suelta. */
const MovingFrames = ({ slug, frameCount = 3, size = 190, tone = 'accent' }) => {
    const [frame, setFrame] = useState(1)

    useEffect(() => {
        if (!slug) return
        // Respeta a quien pidio menos movimiento en el sistema.
        const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (quieto) return

        const id = setInterval(() => {
            setFrame(f => (f % frameCount) + 1)
        }, 750)
        return () => clearInterval(id)
    }, [slug, frameCount])

    if (!slug) return null
    return <ExerciseFrame slug={slug} index={frame} size={size} tone={tone} />
}

export const ExerciseFocus = ({
    exercises,
    count,
    completed,
    onIncrement,
    onToggleComplete,
}) => {
    const scroller = useRef(null)
    const { t } = useLang()
    const [active, setActive] = useState(0)
    // Evita que el auto-avance se dispare de nuevo por el mismo ejercicio.
    const yaAvanzado = useRef({})

    const irA = (i) => {
        const cont = scroller.current
        if (!cont || i < 0 || i >= exercises.length) return
        cont.scrollTo({ left: cont.clientWidth * i, behavior: 'smooth' })
    }

    // El indice activo sale de la posicion real del scroll.
    const onScroll = () => {
        const cont = scroller.current
        if (!cont) return
        const i = Math.round(cont.scrollLeft / cont.clientWidth)
        if (i !== active) setActive(i)
    }

    // Al terminar un ejercicio, pasa al siguiente.
    useEffect(() => {
        if (!completed[active] || yaAvanzado.current[active]) return
        if (active >= exercises.length - 1) return

        yaAvanzado.current[active] = true
        // Ojo: no llamar `t` a esta variable, tapa la funcion de traduccion.
        const timer = setTimeout(() => irA(active + 1), 900)
        return () => clearTimeout(timer)
    }, [completed, active, exercises.length])

    return (
        <div>
            {/* Barra de posicion: un segmento por ejercicio */}
            <div className="flex items-center gap-1.5 mb-3">
                {exercises.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => irA(i)}
                        aria-label={t('train.goToExercise', { n: i + 1 })}
                        aria-current={i === active}
                        className={`h-1.5 flex-1 rounded-full transition
                            ${completed[i] ? 'bg-success'
                                : i === active ? 'bg-accent'
                                    : 'bg-sunken'}`}
                    />
                ))}
            </div>

            <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-sm text-ink-muted tabular-nums">
                    {active + 1} / {exercises.length}
                </span>
                <div className="flex items-center gap-1.5">
                    <button type="button" onClick={() => irA(active - 1)}
                        disabled={active === 0} aria-label={t('train.prev')}
                        className="p-2 rounded-lg border border-line text-ink-muted
                            hover:text-ink hover:bg-sunken transition disabled:opacity-30">
                        <ChevronLeft size={20} />
                    </button>
                    <button type="button" onClick={() => irA(active + 1)}
                        disabled={active === exercises.length - 1} aria-label={t('train.next')}
                        className="p-2 rounded-lg border border-line text-ink-muted
                            hover:text-ink hover:bg-sunken transition disabled:opacity-30">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Carrusel */}
            <div
                ref={scroller}
                onScroll={onScroll}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth
                    [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {exercises.map((e, index) => {
                    const total = parseInt(e.series) || 0
                    const done = count[index] || 0
                    const isDone = completed[index]

                    return (
                        <section
                            key={index}
                            className="snap-center shrink-0 w-full px-0.5"
                            aria-label={`${t('form.exerciseN', { n: index + 1 })}: ${e.name}`}
                        >
                            <div className={`flex flex-col items-center text-center gap-4 p-5 sm:p-6
                                bg-raised border rounded-2xl transition
                                ${isDone ? 'border-success' : 'border-line'}`}>

                                {/* Ilustracion grande y en movimiento */}
                                {e.exercise?.slug ? (
                                    <MovingFrames
                                        slug={e.exercise.slug}
                                        frameCount={e.exercise.frameCount || 3}
                                        tone={isDone ? 'ink' : 'accent'}
                                    />
                                ) : (
                                    <div className="h-[190px] flex items-center justify-center">
                                        <p className="text-sm text-ink-faint max-w-[15rem]">
                                            {t('train.noIllustration')}
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <h2 className={`text-xl sm:text-2xl font-bold tracking-tight
                                        ${isDone ? 'text-ink-muted line-through' : 'text-ink'}`}>
                                        {e.name}
                                    </h2>
                                    <p className="text-sm text-ink-muted mt-1 tabular-nums">
                                        {formatWeight(e.weight)} · {e.series} × {e.repetitions}
                                    </p>
                                </div>

                                {/* Progreso de series, grande para leer de reojo */}
                                <div className="flex items-center gap-2">
                                    {Array.from({ length: total }).map((_, i) => (
                                        <span key={i}
                                            className={`h-3.5 w-3.5 rounded-full transition
                                                ${i < done ? 'bg-accent' : 'bg-sunken border border-line'}`} />
                                    ))}
                                    <span className="ml-2 text-lg font-bold tabular-nums text-ink">
                                        {done}/{total}
                                    </span>
                                </div>

                                {/* Acciones: el boton principal ocupa el ancho, para el pulgar */}
                                <div className="flex items-center gap-2 w-full max-w-xs">
                                    <button
                                        type="button"
                                        onClick={() => onIncrement(index)}
                                        className="flex-1 px-4 py-3.5 rounded-xl text-base font-semibold
                                            bg-accent text-on-accent hover:bg-accent-hover transition"
                                    >
                                        + {t('train.set')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => onToggleComplete(index)}
                                        aria-label={isDone ? t('train.markUndone') : t('train.markDone')}
                                        className={`p-3.5 rounded-xl border transition shrink-0
                                            ${isDone
                                                ? 'bg-success-soft border-success text-success'
                                                : 'border-line text-ink-faint hover:text-ink hover:bg-sunken'}`}
                                    >
                                        <Check size={22} />
                                    </button>
                                </div>
                            </div>
                        </section>
                    )
                })}
            </div>

            <p className="text-center text-xs text-ink-faint mt-3 sm:hidden">
                {t('train.swipeHint')}
            </p>
        </div>
    )
}
