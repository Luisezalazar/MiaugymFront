// components/ProtectedRoute.jsx
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth()
    const { t } = useLang()

    // Mostrar loading mientras verifica
    if (loading) {
        return (
            <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'>
                <div className='bg-raised border border-line p-8 rounded-2xl shadow-xl text-center min-w-[16rem]'>
                    <p className='text-xl font-bold mb-4 text-ink'>{t('auth.loading')}</p>
                    <div className="progress-track" />
                </div>
            </div>
        )
    }

    // Si no está autenticado, redirigir a login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    // Si está autenticado, mostrar el componente
    return children
}

export { ProtectedRoute }
export default ProtectedRoute