import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

export const Home = () => {

  const { theme } = useTheme()

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
        ¡Welcome Miau
        <span className="dark:text-primary-300 text-[#0202FF]">Gym</span>!
      </h1>

      {/* Logo */}
      <div className="justify-center flex">
        <img src={theme === 'dark' ? '/logo.ico' : '/MiauGym.ico'} alt="Logo" />
      </div>

      {/* Section routine*/}
      <h1 className="font-bold text-center text-3xl py-4">Look at your routines</h1>
      <div className="flex justify-center mt-4">
        <Link to="/myRoutine">
          <button
            type="button"
            className="flex items-center dark:bg-primary-300 dark:text-black text-white
                       px-4 py-2 rounded-lg dark:hover:bg-primary-500 transition mb-6 cursor-pointer 
                       bg-[#0202FF] hover:bg-[#3232ff] dark:border-black dark:border-2 font-bold shadow"
          >
            My routines
          </button>
        </Link>
      </div>

      {/* Section Calories Calculator */}
      <h1 className="font-bold text-center text-2xl py-4">
        Do you want to calculate your calories to consume?
      </h1>
      <div className="flex justify-center mt-4">
        <Link to="/calculator">
          <button
            type="button"
            className="flex items-center dark:bg-primary-300 dark:text-black text-white
                       px-4 py-2 rounded-lg dark:hover:bg-primary-500 transition mb-6 cursor-pointer dark:border-black dark:border-2 font-bold
                       bg-[#0202FF] hover:bg-[#3232ff]"
          >
            Calories Calculator
          </button>
        </Link>
      </div>

      <h1 className="font-bold text-center text-2xl py-4">
        This project is still in progress, improvements will come.
      </h1>
      <h1 className="font-bold text-center text-2xl py-4">
        Thank you for using MiauGym!
      </h1>

      {/* Botton install app */}
      <div>
        <button
          onClick={handleInstallClick}
          className="fixed bottom-4 right-4 bg-[#0202FF]  text-white dark:text-black dark:bg-primary-300 dark:hover:bg-primary-600 border-2 drop-shadow-black drop-shadow-lg font-semibold p-3 rounded-full shadow-lg"
        >
          Instalar MiauGym
        </button>
      </div>
    </div>
  )
}
