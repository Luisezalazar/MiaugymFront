import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create context
const AuthContext = createContext()

// Hook for use context
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

// Provider context Auth
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const BASE_URL = import.meta.env.VITE_BASE_URL

    // Verify token
    useEffect(() => {
        checkAuthStatus()
    }, [])

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                setLoading(false)
                return
            }

            // Verify if token is valid
            const response = await fetch(`${BASE_URL}/register/verify`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                const userData = await response.json()
                setUser(userData.user)
                setIsAuthenticated(true)
            } else {
                localStorage.removeItem('token')
                setIsAuthenticated(false)
                setUser(null)
            }
        } catch (error) {
            console.error('Error verify auth:', error)
            localStorage.removeItem('token')
            setIsAuthenticated(false)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    // Login
    const login = async (credentials) => {
    try {
        const response = await fetch(`${BASE_URL}/register/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        const result = await response.json()

        if (response.ok && result.token) {
            localStorage.setItem('token', result.token)
            setUser(result.person) 
            setIsAuthenticated(true)
            return { success: true, message: 'Login successfully' }
        } else {
            return { success: false, message: result.message || 'Invalid credentials' }
        }
    } catch (error) {
        console.error('Error in login:', error)
        return { success: false, message: 'Connection error' }
    }
}

    // Register
    const register = async (userData) => {
        try {
            const response = await fetch(`${BASE_URL}/register/createPerson`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            
            const result = await response.json()
            
            if (response.ok && result.token) {
                localStorage.setItem('token', result.token)
                setUser(result.user || { user: userData.user, email: userData.email })
                setIsAuthenticated(true)
                return { success: true, message: 'Register successfully' }
            } else {
                return { success: false, message: result.message || 'Error in register' }
            }
        } catch (error) {
            console.error('Error in register:', error)
            return { success: false, message: 'Connection error' }
        }
    }

    // Logout
    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        setIsAuthenticated(false)
        navigate('/login')
    }

    // Obtain token
    const getToken = () => {
        return localStorage.getItem('token')
    }

    // Shared values
    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        getToken,
        checkAuthStatus
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}