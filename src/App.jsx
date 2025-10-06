import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { Navbar } from './component/Navbar'
import { MyRoutine } from './pages/routine/MyRoutine'
import { Exercises } from './pages/routine/Exercises'
import { CreateRoutine } from './pages/routine/CreateRoutine'
import { Footer } from './component/Footer'
import { SeeRoutine } from './pages/routine/SeeRoutine'
import { Register } from './pages/logIn/Register'
import { LogIn } from './pages/logIn/LogIn'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './services/ProtectedRoute'
import { Calculator } from './pages/calculator/Calculator'
import { EditRoutine } from './pages/routine/EditRoutine'
import { FoodDistribution } from './pages/food/FoodDistribution'
import { CaloricSurplus } from './pages/food/CaloricSurplus'
import { CaloricDeficit } from './pages/food/CaloricDeficit'
import { Maintenance } from './pages/food/Maintenance'

export const App = () => {
  return (
    <>
      <AuthProvider>
        <Navbar></Navbar>
        <div className=' dark:bg-[#202324] text-black dark:text-white bg-white'>
          <Routes>
            {/* Home */}
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            {/* Routine */}
            <Route path='/myRoutine' element={<ProtectedRoute><MyRoutine /></ProtectedRoute>} />
            <Route path='/exercises' element={<ProtectedRoute><Exercises /></ProtectedRoute>} />
            <Route path='/createRoutine' element={<ProtectedRoute><CreateRoutine /></ProtectedRoute>} />
            <Route path='/seeRoutine/:id' element={<ProtectedRoute><SeeRoutine /></ProtectedRoute>} />
            <Route path='/editRoutine/:id' element={<ProtectedRoute><EditRoutine /></ProtectedRoute>} />
            {/* Calculator */}
            <Route path='/calculator' element={<ProtectedRoute><Calculator /></ProtectedRoute>} />
            {/* Food */}
            <Route path='/food' element={<ProtectedRoute><FoodDistribution /></ProtectedRoute>} />
            <Route path='/superavit' element={<ProtectedRoute>< CaloricSurplus /></ProtectedRoute>} />
            <Route path='/deficit' element={<ProtectedRoute><CaloricDeficit /></ProtectedRoute>} />
            <Route path='/maintenance' element={<ProtectedRoute><Maintenance /></ProtectedRoute>} />

            {/* Login */}
            <Route path='/*' element={<LogIn />} />
            <Route path='/signup' element={<Register />} />
            <Route path='/login' element={<LogIn />} />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </>
  )
}
