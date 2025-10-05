import React from 'react'
import { Link } from 'react-router-dom'

export const Exercises = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Add button */}
      <div className="flex justify-center mt-4">
        <Link to="/createExercise">
          <button type='button' className='flex items-center bg-red-600 text-white
           px-4 py-2 rounded-lg hover:bg-red-700 transition mb-6 cursor-pointer'>
            Create Exercise
          </button>
        </Link>
      </div>
    </div>
  )
}
