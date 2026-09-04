import { createContext, useContext } from 'react'

// Ver la nota en auth.js sobre por que el hook no vive junto al provider.
export const LanguageContext = createContext()

export const useLang = () => {
    const ctx = useContext(LanguageContext)
    if (!ctx) throw new Error('useLang debe usarse dentro de LanguageProvider')
    return ctx
}
