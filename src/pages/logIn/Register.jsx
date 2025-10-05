import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const Register = () => {
    const [formulary, setFormulary] = useState({
        user: "",
        password: "",
        email: ""
    })

    const [loading, setLoading] = useState(false)
    const { register, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormulary(previusData => ({
            ...previusData,
            [name]: value
        }))
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard") // Cambia por tu ruta principal
        }
    }, [isAuthenticated, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const result = await register(formulary)

            if (result.success) {
                setTimeout(() => {
                    setLoading(false)
                    navigate("/dashboard") // Cambia por tu ruta principal
                }, 1000)
            } else {
                console.log("Registration failed:", result.message)
                setLoading(false)
            }
        } catch (error) {
            console.log("Error create Person", error)
            setLoading(false)
        }
    }

    return (
        <div className='px-6 py-8'>
            <div>
                <h1 className='text-center text-4xl mb-6 font-semibold'>Sign up</h1>
                <form onSubmit={handleSubmit} className='max-w-xl mx-auto p-6 bg-neutral-900 rounded-lg shadow-lg'>
                    <h1 className='text-center text-2xl font-bold'>Miau<span className='text-primary-300'>Gym</span></h1>
                    <div className='mb-6'>

                        <label htmlFor="user" className='block font-semibold mb-2  text-white'>User: </label>
                        <input type="text" name='user' value={formulary.user} onChange={handleChange}
                            className='w-full py-2 px-2 border rounded-lg focus:ring-2 focus:ring-primary-500' required />

                        <label htmlFor="password" className='block font-semibold mb-2 mt-4 text-white'>Password: </label>
                        <input type="password" name='password' value={formulary.password} onChange={handleChange}
                            className='w-full py-2 px-2 border rounded-lg focus:ring-2 focus:ring-primary-500' required />

                        <label htmlFor="email" className='block font-semibold mb-2 mt-4 text-white'>Email: </label>
                        <input type="email" name='email' value={formulary.email} onChange={handleChange}
                            className='w-full py-2 px-2 border rounded-lg focus:ring-2 focus:ring-primary-500' required />

                    </div>

                    {/* Login link */}
                    <div className="mb-3">
                        <h3 className='text-white'>Already have an account?, <Link className='border-b-1 hover:text-primary-600 text-primary-300' to={"/login"}>Log in</Link></h3>
                    </div>

                    {/* Save button */}
                    <div className="mt-6 text-right">
                        <button type='submit'
                            className={`px-4 py-2 rounded-lg transition text-white ${loading ? "bg-primary-300 cursor-not-allowed" : "bg-primary-700 hover:bg-primary-600"}`}
                            disabled={loading}>
                            {loading ? "Creating user..." : "Sign up"}
                        </button>
                    </div>
                </form>

                {/* Modal loading */}
                {loading && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                        <div className='bg-gray-800 p-8 rounded-2xl shadow-xl text-center'>
                            <p className='text-xl font-bold mb-4 text-white'>Creating user...</p>
                            <div className='w-64 bg-gray-200 rounded-full h-4 overflow-hidden'>
                                <div className='bg-primary-600 h-4 animate-pulse w-1/2'></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}