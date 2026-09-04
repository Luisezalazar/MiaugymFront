import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { Dumbbell, Edit, MoreVertical, Plus, Timer, Trash, X } from 'lucide-react'
import { useLang } from '../../context/language'
import { BASE_URL } from '../../services/apiConfig'

export const MyRoutine = () => {

  const [routines, setRoutines] = useState([])
  const { user, getToken } = useAuth();
  const { t } = useLang()
  const [menu, setMenu] = useState(null)
  const navigate = useNavigate();
  const [loadingDelete, setLoadingDelete] = useState(null)
  const [loading, setLoading] = useState(false)


  const fetchUserRoutines = async () => {
    const token = getToken();
    if (!user || !token) {
      console.log("No authenticated user found.")
      return
    }
    try {
      setLoading(true)
      const response = await fetch(`${BASE_URL}/person/getPersonRoutine`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setRoutines(data.routines || [])
      }
    } catch (error) {
      console.error("Error fetching user routines:", error);
      setRoutines([]);
    } finally {
      setLoading(false)
    }
  }


  const handleSeeRoutine = (routine) => {
    navigate(`/seeRoutine/${routine.id}`, { state: { routine } });
  }

  const handleEdit = (routine) => {
    navigate(`/editRoutine/${routine.id}`, { state: { routine } })
  }

  const handleDelete = async (routineId) => {
    const confirmDelete = window.confirm(t('routine.confirmDelete'))
    if (!confirmDelete) return;

    const token = getToken();
    if (!user || !token) {
      console.error("User not authenticated")
      return
    }
    setLoadingDelete(routineId);
    try {
      const response = await fetch(`${BASE_URL}/routine/deleteRoutine/${routineId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        setRoutines(prev => prev.filter(r => r.id !== routineId))
        setMenu(null)
        console.log("Routine deleted successfully")
      } else {
        const errorData = await response.json()
        console.error("Error deleting routine: ", errorData.error)
      }
    } catch (error) {
      console.error("Error deleting routine: ", error)
    } finally {
      setLoadingDelete(null)
    }
  }

  useEffect(() => {
    fetchUserRoutines();
  }, [user, getToken])


  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

      {/* Encabezado: titulo y accion primaria en la misma linea */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {user?.user ? t('routine.ofUser', { user: user.user }) : t('routine.mine')}
          </h1>
          {!loading && routines.length > 0 && (
            <p className="text-sm text-ink-muted mt-1">
              {routines.length} {routines.length === 1 ? t('routine.one') : t('routine.many')}
            </p>
          )}
        </div>

        <Link to="/createRoutine"
          className='flex items-center gap-2 bg-accent text-on-accent hover:bg-accent-hover
            px-4 py-2.5 rounded-lg font-semibold transition shrink-0'>
          <Plus size={18} />
          {t('routine.create')}
        </Link>
      </div>

      {loading ? (
        /* Esqueletos con la misma forma que las tarjetas reales:
           la pagina no salta cuando terminan de cargar. */
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[0, 1, 2].map((i) => (
            <div key={i} className='bg-raised border border-line rounded-xl p-5 animate-pulse'>
              <div className='h-5 w-2/3 bg-sunken rounded mb-4' />
              <div className='h-4 w-1/3 bg-sunken rounded mb-6' />
              <div className='h-3 w-full bg-sunken rounded mb-2' />
              <div className='h-3 w-4/5 bg-sunken rounded' />
            </div>
          ))}
        </div>
      ) : routines.length > 0 ? (

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {routines.map((routine) => {
            const exercises = routine.routineExercise || []
            return (
              <div key={routine.id}
                className='relative group bg-raised border border-line rounded-xl
                  hover:border-accent transition'>

                {/* Area principal: toda la tarjeta abre la rutina */}
                <button onClick={() => handleSeeRoutine(routine)}
                  className='w-full text-left p-5 pr-12 cursor-pointer'>

                  <h2 className='text-lg font-semibold text-ink truncate'>
                    {routine.name}
                  </h2>

                  {/* Metadatos: lo que antes habia que abrir la rutina para saber */}
                  <div className='flex items-center gap-4 mt-2 text-sm text-ink-muted'>
                    <span className='flex items-center gap-1.5'>
                      <Dumbbell size={15} />
                      {exercises.length} {exercises.length === 1 ? t('routine.exercise') : t('routine.exercises')}
                    </span>
                    {routine.duration ? (
                      <span className='flex items-center gap-1.5'>
                        <Timer size={15} />
                        {routine.duration}s {t('routine.rest')}
                      </span>
                    ) : null}
                  </div>

                  {/* Vista previa de los primeros ejercicios */}
                  {exercises.length > 0 && (
                    <ul className='mt-4 pt-4 border-t border-line space-y-1.5'>
                      {exercises.slice(0, 3).map((ex) => (
                        <li key={ex.id} className='flex justify-between gap-3 text-sm'>
                          <span className='text-ink-muted truncate'>{ex.name}</span>
                          <span className='text-ink-faint shrink-0 tabular-nums'>
                            {ex.series}×{ex.repetitions}
                          </span>
                        </li>
                      ))}
                      {exercises.length > 3 && (
                        <li className='text-xs text-ink-faint pt-1'>
                          +{exercises.length - 3} {t('routine.more')}
                        </li>
                      )}
                    </ul>
                  )}
                </button>

                {/* Menu contextual */}
                <button onClick={() => setMenu(menu === routine.id ? null : routine.id)}
                  aria-label={t('routine.options')}
                  className='absolute top-3 right-3 p-2 rounded-md text-ink-muted
                    hover:text-ink hover:bg-sunken transition'>
                  {menu === routine.id ? <X size={18} /> : <MoreVertical size={18} />}
                </button>

                {menu === routine.id && (
                  <>
                    {/* Capa invisible: cerrar tocando fuera del menu */}
                    <div className='fixed inset-0 z-10' onClick={() => setMenu(null)} />

                    <div className='absolute top-12 right-3 z-20 w-40 py-1
                      bg-raised border border-line rounded-lg shadow-lg'>
                      <button onClick={() => handleEdit(routine)}
                        className='flex items-center gap-2.5 w-full px-3 py-2 text-sm
                          text-ink-muted hover:text-ink hover:bg-sunken transition'>
                        <Edit size={16} /> {t('routine.edit')}
                      </button>

                      <button
                        onClick={() => handleDelete(routine.id)}
                        className='flex items-center gap-2.5 w-full px-3 py-2 text-sm
                          text-danger hover:bg-danger-soft transition disabled:opacity-50'
                        disabled={loadingDelete === routine.id}
                      >
                        <Trash size={16} />
                        {loadingDelete === routine.id ? t('routine.deleting') : t('routine.delete')}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        /* Estado vacio con salida clara, en vez de una linea de texto gris */
        <div className='flex flex-col items-center text-center py-16 px-6
          border border-dashed border-line rounded-xl'>
          <div className='p-3 rounded-full bg-accent-soft text-accent mb-4'>
            <Dumbbell size={28} />
          </div>
          <h2 className='text-lg font-semibold text-ink'>{t('routine.emptyTitle')}</h2>
          <p className='text-sm text-ink-muted mt-1.5 max-w-sm'>
            {t('routine.emptyText')}
          </p>
          <Link to="/createRoutine"
            className='mt-6 flex items-center gap-2 bg-accent text-on-accent hover:bg-accent-hover
              px-4 py-2.5 rounded-lg font-semibold transition'>
            <Plus size={18} />
            {t('routine.create')}
          </Link>
        </div>
      )}
    </div>
  )
}
