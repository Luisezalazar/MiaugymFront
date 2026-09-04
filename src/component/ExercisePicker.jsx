import React, { useEffect, useMemo, useState } from 'react'
import { Search, X, Loader2 } from 'lucide-react'
import { useAuth } from '../context/auth'
import { ExerciseFrame } from './ExerciseFrame'
import { useLang } from '../context/language'
import { BASE_URL } from '../services/apiConfig'

/*
  Selector del catalogo de ejercicios.

  Se abre desde el formulario de rutina. Al elegir uno devuelve el ejercicio
  completo, para que quien lo abrio complete el nombre y guarde el vinculo
  (exerciseId) que despues permite mostrar las ilustraciones en la rutina.
*/
export const ExercisePicker = ({ open, onClose, onSelect }) => {
    const { getToken } = useAuth()
    const { t } = useLang()

    const [search, setSearch] = useState('')
    const [muscle, setMuscle] = useState('')
    const [equipment, setEquipment] = useState('')
    const [exercises, setExercises] = useState([])
    const [filters, setFilters] = useState({ muscles: [], equipment: [] })
    const [loading, setLoading] = useState(false)

    // Los filtros se piden una sola vez al abrir.
    useEffect(() => {
        if (!open || filters.muscles.length) return
        const token = getToken()
        if (!token) return

        fetch(`${BASE_URL}/exercise/getFilters`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(r => r.ok ? r.json() : null)
            .then(d => d && setFilters(d))
            .catch(err => console.error('Error cargando filtros:', err))
    }, [open, BASE_URL, getToken, filters.muscles.length])

    // Busqueda con debounce: no dispara una peticion por tecla.
    useEffect(() => {
        if (!open) return
        const token = getToken()
        if (!token) return

        setLoading(true)
        const params = new URLSearchParams()
        if (search.trim()) params.set('search', search.trim())
        if (muscle) params.set('muscle', muscle)
        if (equipment) params.set('equipment', equipment)
        params.set('limit', '60')

        const timer = setTimeout(() => {
            fetch(`${BASE_URL}/exercise/getExercises?${params}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(r => r.ok ? r.json() : [])
                .then(d => setExercises(Array.isArray(d) ? d : []))
                .catch(err => {
                    console.error('Error buscando ejercicios:', err)
                    setExercises([])
                })
                .finally(() => setLoading(false))
        }, 250)

        return () => clearTimeout(timer)
    }, [open, search, muscle, equipment, BASE_URL, getToken])

    // Cerrar con Escape.
    useEffect(() => {
        if (!open) return
        const onKey = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [open, onClose])

    const hayFiltros = useMemo(() => search || muscle || equipment, [search, muscle, equipment])

    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4"
            onClick={onClose}
        >
            <div
                className="w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[85vh] flex flex-col
                    bg-raised border border-line rounded-t-2xl sm:rounded-2xl shadow-xl"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={t('catalog.title')}
            >
                {/* Encabezado */}
                <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-3">
                    <div>
                        <h2 className="text-lg font-semibold text-ink">{t('catalog.title')}</h2>
                        <p className="text-sm text-ink-muted mt-0.5">
                            {loading ? t('catalog.searching') : `${exercises.length} ${exercises.length === 1 ? t('catalog.result') : t('catalog.results')}`}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label={t('catalog.close')}
                        className="p-2 rounded-md text-ink-muted hover:text-ink hover:bg-sunken transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Buscador y filtros */}
                <div className="px-5 pb-4 space-y-2.5 border-b border-line">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={t('catalog.search')}
                            autoFocus
                            className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-sunken border border-line text-ink
                                placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent
                                focus:border-accent transition"
                        />
                    </div>

                    <div className="flex gap-2">
                        <select
                            value={muscle}
                            onChange={(e) => setMuscle(e.target.value)}
                            aria-label={t('catalog.allMuscles')}
                            className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-sunken border border-line text-ink text-sm
                                focus:outline-none focus:ring-2 focus:ring-accent transition"
                        >
                            <option value="">{t('catalog.allMuscles')}</option>
                            {filters.muscles.map(m => (
                                <option key={m.value} value={m.value}>{m.value} ({m.count})</option>
                            ))}
                        </select>

                        <select
                            value={equipment}
                            onChange={(e) => setEquipment(e.target.value)}
                            aria-label={t('catalog.allEquipment')}
                            className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-sunken border border-line text-ink text-sm
                                focus:outline-none focus:ring-2 focus:ring-accent transition"
                        >
                            <option value="">{t('catalog.allEquipment')}</option>
                            {filters.equipment.map(e => (
                                <option key={e.value} value={e.value}>{e.value} ({e.count})</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Resultados */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                    {loading && exercises.length === 0 ? (
                        <div className="flex items-center justify-center gap-2 py-16 text-ink-muted">
                            <Loader2 size={18} className="animate-spin" />
                            <span className="text-sm">{t('catalog.searching')}</span>
                        </div>
                    ) : exercises.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-ink font-medium">{t('catalog.noResults')}</p>
                            <p className="text-sm text-ink-muted mt-1">
                                {hayFiltros ? t('catalog.tryOther') : t('catalog.empty')}
                            </p>
                        </div>
                    ) : (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {exercises.map((ex) => (
                                <li key={ex.id}>
                                    <button
                                        type="button"
                                        onClick={() => { onSelect(ex); onClose() }}
                                        className="w-full flex items-center gap-3 p-3 rounded-xl text-left
                                            bg-sunken border border-line hover:border-accent transition"
                                    >
                                        <ExerciseFrame slug={ex.slug} size={52} />
                                        <div className="min-w-0">
                                            <div className="font-medium text-ink truncate">{ex.name}</div>
                                            <div className="text-xs text-ink-muted mt-0.5 truncate">
                                                {ex.primaryMuscle} · {ex.equipment}
                                            </div>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Atribucion: la licencia CC BY-SA 4.0 la exige */}
                <div className="px-5 py-3 border-t border-line">
                    <p className="text-xs text-ink-faint">
                        {t('catalog.illustrationsBy')}{' '}
                        <a href="https://bryllim.com" target="_blank" rel="noreferrer"
                            className="hover:text-accent underline underline-offset-2">Bryl Lim</a>
                        {' '}{t('footer.and')}{' '}
                        <a href="https://github.com/everkinetic/data" target="_blank" rel="noreferrer"
                            className="hover:text-accent underline underline-offset-2">Everkinetic</a>
                        {' · '}
                        <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer"
                            className="hover:text-accent underline underline-offset-2">CC BY-SA 4.0</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
