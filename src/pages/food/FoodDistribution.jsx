import React, { useState } from 'react'
import { CaloricDeficit } from './CaloricDeficit.jsx'
import { CaloricSurplus } from './CaloricSurplus.jsx'
import { Maintenance } from './Maintenance.jsx'
import { Minus, Plus, Equal } from 'lucide-react'
import { useLang } from '../../context/LanguageContext'

const OPTIONS = [
  {
    key: 'deficit',
    titleKey: 'meals.deficit',
    hintKey: 'meals.deficitHint',
    Icon: Minus,
  },
  {
    key: 'surplus',
    titleKey: 'meals.surplus',
    hintKey: 'meals.surplusHint',
    Icon: Plus,
  },
  {
    key: 'maintenance',
    titleKey: 'meals.maintenance',
    hintKey: 'meals.maintenanceHint',
    Icon: Equal,
  },
]

export const FoodDistribution = () => {

  // Antes se guardaba el JSX del componente en el estado; guardar la clave
  // deja el render como funcion del estado y evita recrear elementos.
  const [selected, setSelected] = useState(null)
  const { t } = useLang()

  const renderSelected = () => {
    switch (selected) {
      case 'deficit': return <CaloricDeficit />
      case 'surplus': return <CaloricSurplus />
      case 'maintenance': return <Maintenance />
      default: return null
    }
  }

  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 py-8'>
      <h1 className='text-2xl sm:text-3xl font-bold tracking-tight text-center'>
        {t('meals.title')}
      </h1>
      <p className='text-sm text-ink-muted text-center mt-2 max-w-lg mx-auto'>
        {t('meals.subtitle')}
      </p>

      {/* Tres opciones visibles a la vez, en vez de un select que las esconde */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8'>
        {OPTIONS.map((option) => {
          const { key, titleKey, hintKey } = option
          // Como variable (no parametro destructurado) queda cubierta por el
          // varsIgnorePattern '^[A-Z_]' del eslint.config, que no ve uso en JSX.
          const Icon = option.Icon
          const active = selected === key
          return (
            <button
              key={key}
              type='button'
              aria-pressed={active}
              onClick={() => setSelected(key)}
              className={`text-left p-4 rounded-xl border transition
                ${active
                  ? 'bg-accent-soft border-accent'
                  : 'bg-raised border-line hover:border-accent'}`}
            >
              <span className={`inline-flex p-2 rounded-lg mb-3
                ${active ? 'bg-accent text-on-accent' : 'bg-sunken text-ink-muted'}`}>
                <Icon size={18} />
              </span>
              <h2 className={`font-semibold ${active ? 'text-accent' : 'text-ink'}`}>
                {t(titleKey)}
              </h2>
              <p className='text-sm text-ink-muted mt-1'>{t(hintKey)}</p>
            </button>
          )
        })}
      </div>

      <div className='mt-8'>
        {renderSelected()}
      </div>
    </div>
  )
}
