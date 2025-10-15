import React, { useState } from 'react'
import { href, Link, useLocation } from 'react-router-dom'
import { LogOut, Menu, Moon, Sun, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth()

  const links = [
    //{ name: "Exercises", href: "/exercises" },
    { name: "My Routine", href: "/MyRoutine" },
    { name: "Calories Calculator", href: "/calculator" },
    { name: "Meals", href: "/food" },
    { name: "Calculator Foods", href: "/calculatorFoods" },
    { name: "Weight Goal", href: "/goal" }
  ]

  //Function know link active
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout()
    setOpen(false)
  }

  return (
    <nav className="bg-[#0202FF] text-white font-bold dark:bg-black dark:text-white dark:drop-shadow-primary-300 dark:drop-shadow-lg drop-shadow-black drop-shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold cursor-pointer">
          <Link to={"/home"} className='flex'>
            Miau<span className='dark:text-primary-300 text-black'>Gym</span>
            <img src="../logo.ico " className='w-10 h-8 ml-1' />
          </Link>
        </div>

        {/* Links desktop */}
        <ul className="hidden md:flex space-x-6">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.href}
                className={`transition ${isActive(link.href) ? "dark:text-primary-700 font-semibold " : "dark:hover:text-primary-400 hover:text-black"}`}
              >{link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* User and button desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {/* Name user */}
              <span className='text-white'>
                <span className='font-semibold dark:text-primary-400'>
                  {user?.user || 'User'}
                </span>
              </span>

              {/* Button logout */}
              <button onClick={handleLogout}
                className='flex items-center space-x-2 dark:bg-primary-600 bg-white dark:hover:bg-primary-700 hover:bg-[#0202FF] hover:text-white border-white border-2 dark:border-black px-4 py-2 rounded-lg transition text-black dark:text-white'>
                <LogOut size={16} />
                <span>Log out</span>
              </button>

            </>
          ) : (
            <Link to={"/login"} className='hidden md:block bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg transition'>
              LogIn
            </Link>
          )}
        </div>




        {/* Button burger */}
        <div>
          {/* Button Dark / Light */}
          <button onClick={toggleTheme} className='mx-4 px-2 p-2 rounded-lg bg-white text-black dark:bg-primary-300 hover:scale-105 transition'>
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
          <button
            className='md:hidden p-2 rounded-log dark:hover:bg-primary-400 transition rounded-lg hover:bg-black'
            onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>



      </div>

      {/* Menu mobile */}

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden dark:bg-black bg-[#0202FF] px-6 py-4 space-y-4 border-t-2 dark:border-primary-300 border-black"
          >

            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setOpen(false)}
                className={`block transition ${isActive(link.href)
                  ? "text-primary-400 font-semibold"
                  : "dark:hover:text-primary-400 hover:text-black"
                  }`}
              >
                {link.name}
              </Link>
            ))}
            {/* User and button mobile */}
            {isAuthenticated ? (
              <>
                {/* User mobile */}
                <div className="text-white border-t-2 dark:border-primary-300 border-black pt-4">
                  <span className="font-bold dark:text-primary-400 text-white">
                    {user?.user || 'User'}
                  </span>

                </div>

                {/* Button logout mobile */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2  px-4 py-2 rounded-lg transition 
                  hover:bg-[#0202FF] dark:hover:bg-primary-300
                  dark:bg-primary-500 dark:hover:text-black bg-white text-black hover:text-white hover:border-1"
                >
                  <LogOut size={16} />
                  <span>Log out</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="w-full block text-center bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg transition"
              >
                LogIn
              </Link>
            )}



          </motion.div>
        )}
      </AnimatePresence>


    </nav>
  )

}
