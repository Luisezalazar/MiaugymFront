// components/ProtectedRoute.jsx
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth()

    // Mostrar loading mientras verifica
    if (loading) {
        return (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                <div className='bg-gray-800 p-8 rounded-2xl shadow-xl text-center'>
                    <p className='text-xl font-bold mb-4 text-white'>Loading...</p>
                    <div className='w-64 bg-gray-200 rounded-full h-4 overflow-hidden'>
                        <div className='bg-red-600 h-4 animate-pulse w-1/2'></div>
                    </div>
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