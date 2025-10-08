import { Facebook, Github, Instagram } from 'lucide-react'
import React from 'react'

export const Footer = () => {
    return (
        <footer className='bg-[#0000c4]  dark:bg-black dark:text-white shadow-lg text-white'>
            <div className='max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8'>
                {/* Column - Logo */}
                <div>
                    <h2 className='text-2xl font-bold'>Miau<span className="dark:text-primary-300 text-black">Gym</span></h2>
                    <p className="text-sm text-white mt-2">MeowRoutines for MeowFacilitate counting</p>
                </div>
                {/* Column 2- Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Links</h3>
                    <ul className="space-y-2">
                        <li><a href="/calculator" className='dark:hover:text-primary-500 hover:text-black transition'>Calculator calories</a></li>
                        <li><a href="/myRoutine" className='dark:hover:text-primary-500 hover:text-black transition'>My Routine</a></li>
                        <li><a href="/calculatorFoods" className='dark:hover:text-primary-500 hover:text-black transition'>Food Calculator</a></li>
                        <li><a href="/food" className='dark:hover:text-primary-500 hover:text-black transition'>Meals</a></li>
                    </ul>
                </div>
                {/* Column 3 - Social */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">My Networks</h3>
                    <div className='flex space-x-4'>
                        <a href="" target='_blank' rel='noreferrer' className='dark:hover:text-primary-500 hover:text-black transition'><Instagram size={24} /></a>
                        <a href="" target='_blank' rel='noreferrer' className='dark:hover:text-primary-500 hover:text-black transition'><Github /></a>
                    </div>
                </div>
                {/* Copyright */}
                <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
                    © {new Date().getFullYear()} MiauGym. All rights reserved
                </div>
            </div>
        </footer>
    )
}
