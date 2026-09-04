import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext()

const LANGS = ['en', 'es']

/** Idioma inicial: el guardado, si no el del navegador, si no ingles. */
const idiomaInicial = () => {
    const guardado = localStorage.getItem('lang')
    if (LANGS.includes(guardado)) return guardado
    return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(idiomaInicial)

    useEffect(() => {
        localStorage.setItem('lang', lang)
        // Que el atributo lang del documento acompañe: importa para los
        // lectores de pantalla y para la division silabica del navegador.
        document.documentElement.lang = lang
    }, [lang])

    const toggleLang = () => setLang(prev => (prev === 'es' ? 'en' : 'es'))

    /*
      Traduce una clave. Acepta reemplazos simples: t('form.exerciseN', { n: 2 }).
      Si la clave no existe cae a ingles, y si tampoco, devuelve la clave misma
      para que el olvido se vea en pantalla en vez de romper el render.
    */
    const t = (key, vars) => {
        const texto = translations[lang]?.[key] ?? translations.en?.[key] ?? key
        if (!vars) return texto
        return Object.entries(vars).reduce(
            (acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)),
            texto
        )
    }

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLang = () => {
    const ctx = useContext(LanguageContext)
    if (!ctx) throw new Error('useLang debe usarse dentro de LanguageProvider')
    return ctx
}
