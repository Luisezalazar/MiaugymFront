import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { AlertCircle, Eye, EyeOff, LogIn as LogInIcon } from 'lucide-react'
import { useLang } from '../../context/language'

export const LogIn = () => {
    const [formulary, setFormulary] = useState({
        user: "",
        password: "",
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const { login } = useAuth()
    const { t } = useLang()
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
                setError(result.message || t('auth.badCredentials'))
            }
        } catch (error) {
            console.log("Error login Person", error)
            setError(t('auth.unexpected'))
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex items-center justify-center px-4 py-12 sm:py-20'>
            <div className='w-full max-w-sm'>

                <h1 className='text-2xl font-bold text-center tracking-tight'>{t('auth.login')}</h1>
                <p className='text-sm text-ink-muted text-center mt-1.5 mb-6'>
                    {t('auth.loginSubtitle')}
                </p>

                <form onSubmit={handleSubmit}
                    className='bg-raised border border-line rounded-xl p-6 shadow-sm'>

                    {/* El error usa el token de peligro: antes era cian, el mismo color que el acento */}
                    {error && (
                        <div role="alert"
                            className='flex items-start gap-2.5 mb-5 p-3 rounded-lg
                                bg-danger-soft border border-danger text-danger text-sm'>
                            <AlertCircle size={18} className='shrink-0 mt-px' />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className='space-y-4'>
                        <div>
                            <label htmlFor="user" className='block text-sm font-medium mb-1.5 text-ink'>
                                {t('auth.user')}
                            </label>
                            <input type="text" id="user" name='user' autoComplete='username'
                                value={formulary.user} onChange={handleChange}
                                className='w-full px-3 py-2.5 rounded-lg bg-sunken border border-line text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition'
                                required />
                        </div>

                        <div>
                            <label htmlFor="password" className='block text-sm font-medium mb-1.5 text-ink'>
                                {t('auth.password')}
                            </label>
                            <div className='relative'>
                                <input type={showPassword ? "text" : "password"} id="password" name='password'
                                    autoComplete='current-password'
                                    value={formulary.password} onChange={handleChange}
                                    className='w-full px-3 py-2.5 pr-11 rounded-lg bg-sunken border border-line text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition'
                                    required />
                                <button type='button'
                                    onClick={() => setShowPassword(v => !v)}
                                    aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                                    className='absolute inset-y-0 right-0 px-3 flex items-center
                                        text-ink-faint hover:text-ink transition'>
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <button type='submit'
                        className='w-full flex items-center justify-center gap-2 mt-6 px-4 py-2.5 rounded-lg
                            font-semibold bg-accent text-on-accent hover:bg-accent-hover transition
                            disabled:opacity-60 disabled:cursor-not-allowed'
                        disabled={loading}>
                        <LogInIcon size={18} />
                        {loading ? t('auth.loggingIn') : t('auth.login')}
                    </button>
                </form>

                <p className='text-sm text-ink-muted text-center mt-5'>
                    {t('auth.notRegistered')}{' '}
                    <Link className='font-medium text-accent hover:underline' to={"/signup"}>
                        {t('auth.signup')}
                    </Link>
                </p>
            </div>
        </div>
    )
}
