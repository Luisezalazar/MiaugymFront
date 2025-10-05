import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const LogIn = () => {
    const [formulary, setFormulary] = useState({
        user: "",
        password: "",
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormulary(previusData => ({
            ...previusData,
            [name]: value
        }))

        if (error) setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const result = await login(formulary)

            if (result.success) {
                navigate("/home")
            } else {
                setError(result.message)

            }
        } catch (error) {
            console.log("Error login Person", error)
            setError('Error inesperado. Intenta nuevamente.')
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <div className='px-6 py-8'>
            <div>
                <h1 className='text-center text-4xl mb-6 font-semibold'>Log In</h1>
                <form onSubmit={handleSubmit} className='max-w-xl mx-auto p-6 dark:bg-neutral-900 rounded-lg shadow-lg bg-[#0202FF]'>
                    <h1 className='text-center text-2xl font-bold text-white'>Miau<span className='dark:text-primary-300 text-black'>Gym</span> </h1>

                    {/* Mostrar error si existe */}
                    {error && (
                        <div className='mb-4 p-3 bg-primary-100 border border-primary-400 text-primary-700 rounded'>
                            {error}
                        </div>
                    )}

                    <div className='mb-6'>
                        <label htmlFor="user" className='block font-semibold mb-2  text-white '>User: </label>
                        <input type="text" name='user' value={formulary.user} onChange={handleChange}
                            className='w-full py-2 px-2  shadow-2xl rounded-lg focus:ring-2 focus:ring-primary-500 border-white border-2' required />

                        <label htmlFor="password" className='block font-semibold mb-2 mt-4 text-white'>Password: </label>
                        <input type="password" name='password' value={formulary.password} onChange={handleChange}
                            className='w-full py-2 px-2 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 border-white' required />
                    </div>

                    {/* Save button */}
                    <div className="mt-6 text-right">
                        <h3 className='mb-3 text-white'>Are you not registered?, <Link className='border-b-1 hover:text-primary-600 text-primary-400' to={"/signup"}>Sign up</Link></h3>
                        <button type='submit'
                            className={`px-4 py-2 rounded-lg transition text-white ${loading ? "bg-primary-500 cursor-not-allowed" : "dark:bg-primary-300 dark:hover:bg-primary-500 hover:bg-[#3131fd] border-2 dark:border-black dark:text-black font-semibold"}`}
                            disabled={loading}>
                            {loading ? "Loading user..." : "Log in"}
                        </button>
                    </div>
                </form>

                {/* Modal loading */}
                {loading && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                        <div className='bg-black p-8 rounded-2xl shadow-xl text-center'>
                            <p className='text-xl font-bold mb-4 text-white'>Loading user...</p>
                            <div className='w-64 bg-black rounded-full h-4 overflow-hidden'>
                                <div className='bg-primary-600 h-4 animate-pulse w-1/2'></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
