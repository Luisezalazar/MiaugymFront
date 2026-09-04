import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Languages, LogOut, Menu, Moon, Sun, X } from "lucide-react"
// Se importa como `Motion` (mayuscula) a proposito: la config de ESLint no
// incluye eslint-plugin-react, asi que no detecta el uso dentro de JSX y lo
// marcaba como variable sin usar. El varsIgnorePattern '^[A-Z_]' lo cubre.
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useAuth } from '../context/auth';
import { useTheme } from '../context/theme';
import { useLang } from '../context/language';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang, t } = useLang()
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth()

  const links = [
    { name: t('nav.myRoutine'), href: "/myRoutine" },
    { name: t('nav.calculator'), href: "/calculator" },
    { name: t('nav.meals'), href: "/food" },
    { name: t('nav.calculatorFoods'), href: "/calculatorFoods" },
    { name: t('nav.weightGoal'), href: "/goal" }
  ]

  // Comparacion sin distinguir mayusculas: los href del navbar y las rutas
  // de App.jsx no siempre coinciden en capitalizacion.
  const isActive = (path) =>
    location.pathname.toLowerCase() === path.toLowerCase();

  const handleLogout = () => {
    logout()
    setOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-raised/95 backdrop-blur border-b border-line text-ink">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to={"/home"} className='flex items-center gap-2 text-xl font-bold shrink-0'>
          <img src="/logo.ico" alt="" className='w-7 h-7' />
          <span>Miau<span className='text-accent'>Gym</span></span>
        </Link>

        {/* Links desktop */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition
                  ${isActive(link.href)
                    ? "bg-accent-soft text-accent"
                    : "text-ink-muted hover:text-ink hover:bg-sunken"}`}
              >{link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          {/* Idioma */}
          <button
            onClick={toggleLang}
            aria-label={t('nav.language')}
            title={t('nav.language')}
            className='flex items-center gap-1 p-2 rounded-md text-ink-muted hover:text-ink hover:bg-sunken transition'>
            <Languages size={20} />
            <span className='text-xs font-semibold uppercase'>{lang}</span>
          </button>

          {/* Toggle de tema */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t('nav.toLight') : t('nav.toDark')}
            className='p-2 rounded-md text-ink-muted hover:text-ink hover:bg-sunken transition'>
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isAuthenticated ? (
            <div className="hidden lg:flex items-center gap-3">
              <span className='text-sm font-medium text-ink-muted'>
                {user?.user || 'User'}
              </span>
              <button onClick={handleLogout}
                className='flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
                  border border-line text-ink-muted hover:text-danger hover:border-danger transition'>
                <LogOut size={16} />
                <span>{t('nav.logout')}</span>
              </button>
            </div>
          ) : (
            <Link to={"/login"}
              className='hidden lg:block bg-accent text-on-accent hover:bg-accent-hover px-4 py-2 rounded-md text-sm font-semibold transition'>
              {t('nav.login')}
            </Link>
          )}

          {/* Hamburguesa */}
          <button
            aria-label={t('nav.openMenu')}
            aria-expanded={open}
            className='lg:hidden p-2 rounded-md text-ink-muted hover:text-ink hover:bg-sunken transition'
            onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <Motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-line bg-raised"
          >
            <div className="px-4 py-3 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2.5 rounded-md font-medium transition
                    ${isActive(link.href)
                      ? "bg-accent-soft text-accent"
                      : "text-ink-muted hover:text-ink hover:bg-sunken"}`}
                >
                  {link.name}
                </Link>
              ))}

              {isAuthenticated ? (
                <div className="pt-3 mt-2 border-t border-line flex items-center justify-between gap-3">
                  <span className="px-3 text-sm font-medium text-ink-muted truncate">
                    {user?.user || 'User'}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium shrink-0
                      border border-line text-ink-muted hover:text-danger hover:border-danger transition"
                  >
                    <LogOut size={16} />
                    <span>{t('nav.logout')}</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="mt-2 block text-center bg-accent text-on-accent hover:bg-accent-hover px-4 py-2.5 rounded-md font-semibold transition"
                >
                  {t('nav.login')}
                </Link>
              )}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
