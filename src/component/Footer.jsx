import { Github, Instagram } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

const linkDefs = [
    { key: 'nav.calculator', href: "/calculator" },
    { key: 'nav.myRoutine', href: "/myRoutine" },
    { key: 'nav.calculatorFoods', href: "/calculatorFoods" },
    { key: 'nav.meals', href: "/food" },
    { key: 'nav.weightGoal', href: "/goal" },
]

export const Footer = () => {
    const { t } = useLang()

    return (
        <footer className='shrink-0 bg-raised border-t border-line text-ink-muted'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8'>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-8'>
                    {/* Marca */}
                    <div className='col-span-2 md:col-span-1'>
                        <h2 className='text-lg font-bold text-ink'>
                            Miau<span className="text-accent">Gym</span>
                        </h2>
                        <p className="text-sm mt-1.5 max-w-xs">
                            {t('footer.tagline')}
                        </p>
                    </div>

                    {/* Links */}
                    <nav aria-label={t('footer.navLabel')}>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-3">{t('footer.links')}</h3>
                        <ul className="space-y-2 text-sm">
                            {linkDefs.map((link) => (
                                <li key={link.href}>
                                    <Link to={link.href} className='hover:text-accent transition'>
                                        {t(link.key)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Redes */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-3">{t('footer.networks')}</h3>
                        <div className='flex gap-2'>
                            <a href="https://instagram.com" target='_blank' rel='noreferrer' aria-label="Instagram"
                                className='p-2 rounded-md hover:text-accent hover:bg-sunken transition'>
                                <Instagram size={20} />
                            </a>
                            <a href="https://github.com" target='_blank' rel='noreferrer' aria-label="GitHub"
                                className='p-2 rounded-md hover:text-accent hover:bg-sunken transition'>
                                <Github size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright y atribucion: fila propia, fuera de la grilla.
                    La licencia CC BY-SA 4.0 del catalogo exige el credito visible. */}
                <div className="border-t border-line mt-8 pt-5 space-y-1.5 text-xs text-ink-faint">
                    <p>© {new Date().getFullYear()} MiauGym. {t('footer.rights')}</p>
                    <p>
                        {t('footer.illustrations')}{' '}
                        <a href="https://bryllim.com" target="_blank" rel="noreferrer"
                            className="hover:text-accent underline underline-offset-2">Bryl Lim</a>
                        {' '}{t('footer.and')}{' '}
                        <a href="https://github.com/everkinetic/data" target="_blank" rel="noreferrer"
                            className="hover:text-accent underline underline-offset-2">Everkinetic</a>,
                        {' '}
                        <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer"
                            className="hover:text-accent underline underline-offset-2">CC BY-SA 4.0</a>
                    </p>
                </div>
            </div>
        </footer>
    )
}
