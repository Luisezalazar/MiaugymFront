import { BookOpen, Plus, Trash, X } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth'
import { ExercisePicker } from '../../component/ExercisePicker'
import { ExerciseFrame } from '../../component/ExerciseFrame'
import { useLang } from '../../context/language'
import { BASE_URL } from '../../services/apiConfig'


export const CreateRoutine = () => {

  const [nameRoutine, setNameRoutine] = useState("")
  const [exercises, setExercises] = useState([
    { name: "", weight: "", series: "", repetitions: "", exerciseId: null, slug: null }
  ]);
  const [loading, setLoading] = useState(false)

  // Indice de la fila que abrio el catalogo (null = cerrado)
  const [pickerFor, setPickerFor] = useState(null)

  const [useTimer, setUseTimer] = useState(false)
  const [duration, setDuration] = useState(0)

  //obtain user and token
  const { user, getToken } = useAuth()
  const { t } = useLang()
  const navigate = useNavigate()

  const handleChange = (index, field, value) => {
    const newExercises = [...exercises]
    newExercises[index][field] = value;
    setExercises(newExercises);
  }

  const addExercise = () => {
    setExercises([
      ...exercises,
      { name: "", weight: "", series: "", repetitions: "", exerciseId: null, slug: null },
    ]);
  };

  // Al elegir del catalogo se completa el nombre y se guarda el vinculo.
  const pickFromCatalog = (index, exercise) => {
    const next = [...exercises]
    next[index] = {
      ...next[index],
      name: exercise.name,
      exerciseId: exercise.id,
      slug: exercise.slug,
    }
    setExercises(next)
  }

  // Desvincular deja el nombre escrito pero lo vuelve texto libre.
  const unlinkExercise = (index) => {
    const next = [...exercises]
    next[index] = { ...next[index], exerciseId: null, slug: null }
    setExercises(next)
  }

  const removeExercise = (index) => {
    const newExercises = exercises.filter((_, i) => i !== index)
    setExercises(newExercises);
  };



  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    const token = getToken();

    if (!user || !token) {
      console.error("User not found")
      setLoading(false);
      return
    }

    const data = {
      name: nameRoutine,
      personId: user.id,
      routineExercise: exercises,
      duration: useTimer ? duration : null

    }

    try {
      const response = await fetch(`${BASE_URL}/routine/createRoutine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      console.log(result)

      if (response.ok) {
        setTimeout(() => {
          setLoading(false)
          navigate("/myRoutine")
        }, 1000);
      } else {
        setLoading(false);
        console.error("Error create routine: ", result.error)
      }
    }
    catch (error) {
      console.log("Error crearting routine: ", error)
    }


  }

  return (

    <div className='px-6 py-8'>
      <form onSubmit={handleSubmit} className='max-w-2xl mx-auto p-6 bg-raised border border-line rounded-xl shadow-sm'>

        {/* Name routine */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-ink text-center">{t('form.routineName')}</label>
          <input type="text" value={nameRoutine} onChange={(e) => setNameRoutine(e.target.value)}
            className='w-full px-3 py-2.5 rounded-lg bg-sunken border border-line text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition'
            placeholder={t('form.routineNamePlaceholder')} required />
        </div>

        {/* Checkbox chronometer */}
        <div className='mb-6 flex items-center gap-3'>
          <input type="checkbox" checked={useTimer} onChange={(e) => setUseTimer(e.target.checked)} />
          <label className='font-semibold text-ink'>{t('form.useTimer')}</label>
        </div>

        {/* If userTimer is true */}
        {useTimer && (
          <div className="mb-6">
            <label className="block font-semibold mb-2 text-ink">{t('form.duration')}</label>

            <input
              type="text"
              value={`${String(Math.floor(duration / 60)).padStart(2, "0")}:${String(duration % 60).padStart(2, "0")}`}
              onChange={(e) => {
                //Only digits
                let raw = e.target.value.replace(/\D/g, "");
                let digits = raw.split("");

                if (digits.length > 0) {
                  if (digits.length > 4) {
                    digits = digits.slice(-4);
                  }
                }

                // Ensure minimum 4 digits
                digits = digits.join("").padStart(4, "0");
                const mins = parseInt(digits.slice(0, -2), 10);
                let secs = parseInt(digits.slice(-2), 10);
                if (secs > 59) secs = 59;
                setDuration(mins * 60 + secs);
              }}
              placeholder="00:00"
              className="w-20 px-2 py-2 text-center font-semibold text-ink border rounded-lg focus:ring-2 focus:ring-primary-500"
              inputMode="numeric"
            />
          </div>
        )}


        {/* Ejercicios: tarjetas apiladas. Antes era una tabla de 5 columnas con
            inputs adentro, que en mobile obligaba a scrollear en horizontal
            justo mientras cargas la rutina. */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold text-ink">{t('form.exercises')}</h2>
            <span className="text-sm text-ink-muted tabular-nums">{exercises.length}</span>
          </div>

          {exercises.map((exercise, index) => (
            <div key={index} className="bg-sunken border border-line rounded-xl p-4">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  {t('form.exerciseN', { n: index + 1 })}
                </span>
                <button type='button' onClick={() => removeExercise(index)}
                  aria-label={t('form.removeExercise')}
                  disabled={exercises.length === 1}
                  className='p-1.5 rounded-md text-ink-faint hover:text-danger hover:bg-danger-soft
                    transition disabled:opacity-40 disabled:hover:text-ink-faint disabled:hover:bg-transparent'>
                  <Trash size={18} />
                </button>
              </div>

              <label className='block text-sm font-medium mb-1.5 text-ink'>{t('form.name')}</label>

              {exercise.slug ? (
                /* Vinculado al catalogo: se muestra la ilustracion y el nombre fijo */
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
                /* Sin vincular: texto libre + acceso al catalogo */
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

        {/* Boton con etiqueta: antes era un "+" pelado y, peor, con texto oscuro
            sobre fondo oscuro porque solo tenia fondo en hover. */}
        <button type='button' onClick={addExercise}
          className='w-full flex items-center justify-center gap-2 mt-3 px-4 py-2.5
            rounded-lg border border-dashed border-line text-ink-muted
            hover:text-accent hover:border-accent transition'>
          <Plus size={18} /> {t('form.addExercise')}
        </button>

        <button type='submit'
          className='w-full mt-6 px-4 py-2.5 rounded-lg font-semibold
            bg-accent text-on-accent hover:bg-accent-hover transition
            disabled:opacity-60 disabled:cursor-not-allowed'
          disabled={loading}>
          {loading ? t('form.creatingRoutine') : t('form.createRoutine')}
        </button>




      </form >
      <ExercisePicker
        open={pickerFor !== null}
        onClose={() => setPickerFor(null)}
        onSelect={(ex) => pickFromCatalog(pickerFor, ex)}
      />

      {/* Modal loading */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-raised border border-line p-8 rounded-2xl shadow-xl text-center min-w-[16rem]">
            <p className="text-xl font-bold mb-4 text-ink">{t('form.creatingRoutine')}</p>
            <div className="progress-track" />
          </div>
        </div>
      )}
    </div>
  )
}
