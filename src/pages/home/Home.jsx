import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useLang } from '../../context/LanguageContext'

const SHORTCUTS = [
  { href: '/myRoutine', key: 'home.myRoutines', img: '/routine.png' },
  { href: '/calculator', key: 'home.calorieCount', img: '/CalorieCount.png' },
  { href: '/food', key: 'home.meals', img: '/FoodDistribution.png' },
  { href: '/calculatorFoods', key: 'home.proteinCalculate', img: '/proteinCalculator.png' },
  { href: '/goal', key: 'home.goal', img: '/Goal.png' },
]

export const Home = () => {

  const { theme } = useTheme()
  const { t } = useLang()

  // useState for storing the event beforeInstall
  const [installPrompt, setInstallPrompt] = useState(null)

  useEffect(() => {
    //Listen the event before it shows a prompt for installation
    const beforeInstallHandler = (e) => {
      e.preventDefault() // Evita que Chrome muestre el prompt automáticamente
      console.log('beforeinstallprompt fired', e)
      setInstallPrompt(e) // Guardamos el evento para usarlo cuando el usuario haga click
    }

    window.addEventListener('beforeinstallprompt', beforeInstallHandler)

    //Listen if the app is already installed
    const appInstalledHandler = () => {
      console.log('App instalada')
      setInstallPrompt(null)
    }

    window.addEventListener('appinstalled', appInstalledHandler)

    // Cleanup of listeners
    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallHandler)
      window.removeEventListener('appinstalled', appInstalledHandler)
    }
  }, [])

  const handleInstallClick = () => {
    if (installPrompt) {
      // If the event beforeInstall exists, show the prompt
      installPrompt.prompt()
      installPrompt.userChoice.then(() => {
        setInstallPrompt(null)
      })
    } else {
      // If the event doesn't exists, Show instructions
      alert(
        'To install the app, touch the icon with the three dots then select "Add to homescreen"'

      )
    }
  }

  return (
    <div className="items-center justify-center text-center">
      {/* Title */}
      <h1 className="font-bold text-center text-3xl py-4">
        {t('home.welcome')} Miau<span className="text-accent">Gym</span>!
      </h1>

      {/* Logo: el .ico se dibujaba a su tamano intrinseco y abria un hueco enorme */}
      <div className="justify-center flex">
        <img
          src={theme === 'dark' ? '/logo.ico' : '/MiauGym.ico'}
          alt="Logo"
          className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
        />
      </div>


      {/* Accesos. Antes "Goal" quedaba FUERA de este grid (despues del </div>),
          por eso caia solo en una fila aparte. Ahora los cinco salen de la misma
          lista, con proporcion fija para que las alturas coincidan. */}
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto px-4'>
        {SHORTCUTS.map(({ href, key, img }) => (
          <Link key={href} to={href}
            className='group h-full rounded-xl overflow-hidden
              border-2 border-line-strong bg-raised shadow-md
              transition hover:border-accent hover:shadow-lg hover:-translate-y-0.5
              focus-visible:border-accent'>

            <span className='block bg-accent text-on-accent font-bold text-sm py-2 px-3'>
              {t(key)}
            </span>

            {/* aspect-square iguala la altura de todos los cuadros pese a que
                las imagenes tienen proporciones distintas */}
            <img
              src={img}
              alt=''
              loading='lazy'
              className='w-full aspect-square object-cover
                transition duration-300 group-hover:scale-105'
            />
          </Link>
        ))}
      </div>

      <h1 className="font-bold text-center text-2xl py-4">
        {t('home.thanks')}
      </h1>

      {/* Botton install app */}
      <div>
        <button
          onClick={handleInstallClick}
          className="fixed bottom-4 right-4 bg-accent text-on-accent border-2 drop-shadow-black drop-shadow-lg font-semibold p-3 rounded-full shadow-lg"
        >
          {t('home.install')}
        </button>
      </div>
    </div>
  )
}
