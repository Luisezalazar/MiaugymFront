import { createContext, useContext } from 'react'

/*
  Contexto y hook de autenticacion, separados del provider.

  Van en su propio archivo porque react-refresh solo conserva el estado si un
  .jsx exporta unicamente componentes. Con el hook adentro, editar el provider
  recreaba el contexto y los consumidores quedaban apuntando al viejo: en
  desarrollo aparecia "useX debe usarse dentro de XProvider" hasta recargar.
*/
export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}
