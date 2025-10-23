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


      <div className='grid grid-cols-2 px-10 sm:grid-cols-2 gap-2 place-items-center mt-8'>
        {/* Section routine*/}
        <Link to="/myRoutine">
          <button
            type="button"
            className="flex flex-col items-center dark:bg-primary-300 dark:text-black text-white
                        rounded-lg dark:hover:bg-primary-500 transition mb-4 cursor-pointer 
                       bg-[#0202FF] hover:bg-[#3232ff] dark:border-black dark:border-2 font-bold shadow"
          >
            My routines
            <img src="/routine.png" className='w-35' alt="" />
          </button>

        </Link>

        {/* Section Calories Calculator */}
        <Link to="/calculator">
          <button
            type="button"
            className="flex flex-col items-center dark:bg-primary-300 dark:text-black text-white
                        rounded-lg dark:hover:bg-primary-500 transition mb-4 cursor-pointer 
                       bg-[#0202FF] hover:bg-[#3232ff] dark:border-black dark:border-2 font-bold shadow"
          >
            Calorie Count
            <img src="/CalorieCount.png" className='w-35' alt="" />
          </button>

        </Link>

        {/* Meals */}
        <Link to="/food">
          <button
            type="button"
            className="flex flex-col items-center dark:bg-primary-300 dark:text-black text-white
                        rounded-lg dark:hover:bg-primary-500 transition mb-4 cursor-pointer 
                       bg-[#0202FF] hover:bg-[#3232ff] dark:border-black dark:border-2 font-bold shadow"
          >
            Meals
            <img src="/FoodDistribution.png" className='w-35' alt="" />
          </button>

        </Link>

        {/* Meals */}
        <Link to="/calculatorFoods">
          <button
            type="button"
            className="flex flex-col items-center dark:bg-primary-300 dark:text-black text-white
                        rounded-lg dark:hover:bg-primary-500 transition mb-4 cursor-pointer 
                       bg-[#0202FF] hover:bg-[#3232ff] dark:border-black dark:border-2 font-bold shadow"
          >
            Protein Calculate
            <img src="/proteinCalculator.png" className='w-35' alt="" />
          </button>

        </Link>


      </div>
      {/* Goal */}
      <Link to="/goal">
        <button
          type="button"
          className=" mt-2 items-center dark:bg-primary-300 dark:text-black text-white
                        rounded-lg dark:hover:bg-primary-500 transition mb-4 cursor-pointer 
                       bg-[#0202FF] hover:bg-[#3232ff] dark:border-black dark:border-2 font-bold shadow"
        >
          Goal
          <img src="/Goal.png" className='w-35' alt="" />
        </button>

      </Link>

      
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
