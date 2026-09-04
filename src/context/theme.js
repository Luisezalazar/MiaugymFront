import { createContext, useContext } from 'react'

// Ver la nota en auth.js sobre por que el hook no vive junto al provider.
export const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)
