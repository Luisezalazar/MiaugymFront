import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Edit, Menu, Trash, X } from 'lucide-react'

export const MyRoutine = () => {

  const [routines, setRoutines] = useState([])
  const { user, getToken } = useAuth();
  const [menu, setMenu] = useState(null)
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [loadingDelete, setLoadingDelete] = useState(null)
  const [loading, setLoading] = useState(false)


  const fetchUserRoutines = async () => {
    const token = getToken();
    if (!user || !token) {
      console.log("No authenticated user found.")
      return
    }
    try {
      setLoading(true)
      const response = await fetch(`${BASE_URL}/person/getPersonRoutine`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setRoutines(data.routines || [])
      } else {
        console.error("Failed to fetch user routines:", response.statusText);
        setRoutines([]);
      }
    } catch (error) {
      console.error("Error fetching user routines:", error);
      setRoutines([]);
    } finally {
      setLoading(false)
    }
  }


  const handleSeeRoutine = (routine) => {
    navigate(`/seeRoutine/${routine.id}`, { state: { routine } });
  }

  const handleEdit = (routine) => {
    navigate(`/editRoutine/${routine.id}`, { state: { routine } })
  }

  const handleDelete = async (routineId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this routine?")
    if (!confirmDelete) return;

    const token = getToken();
    if (!user || !token) {
      console.error("User not authenticated")
      return
    }
    setLoadingDelete(routineId);
    try {
      const response = await fetch(`${BASE_URL}/routine/deleteRoutine/${routineId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        setRoutines(prev => prev.filter(r => r.id !== routineId))
        setMenu(null)
        console.log("Routine deleted successfully")
      } else {
        const errorData = await response.json()
        console.error("Error deleting routine: ", errorData.error)
      }
    } catch (error) {
      console.error("Error deleting routine: ", error)
    } finally {
      setLoadingDelete(null)
    }
  }

  useEffect(() => {
    fetchUserRoutines();
  }, [user, getToken])


  return (
    <div className="max-w-6xl mx-auto p-6">

      <h2 className="text-3xl font-bold text-center mb-8">
        {user?.user ? `${user.user}'s Routines ` : 'My Routines'}
      </h2>

      {/* Button create routine */}
      <div className="flex justify-center mt-4">
        <Link to="/createRoutine">
          <button type='button' className='flex items-center font-bold dark:bg-primary-300 dark:border-2 dark:text-zinc-950 text-white
           px-4 py-2 rounded-lg dark:hover:bg-primary-600 transition mb-6 cursor-pointer
           bg-[#0202FF] hover:bg-[#3232ff] '>
            Create Routine
          </button>
        </Link>
      </div>

      {/* Pre Loading */}
      {loading ? (

        <div className="flex flex-col justify-center items-center my-8">
          <span className="dark:text-white  text-black font-semibold">Search rotuines...</span>

          <div className="w-64 bg-gray-200 rounded-full h-4 overflow-hidden">
            <div className="dark:bg-primary-600 bg-[#0202FF] h-4 animate-pulse w-3/4" />
          </div>
        </div>
      ) : (

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {routines.length > 0 ? (
            routines.map((routine) => (
              <div key={routine.id} className='relative'>
                <button key={routine.id} onClick={() => handleSeeRoutine(routine)}
                  className='dark:bg-gray-900 shadow-xl rounded-2xl px-8 py-6 border-2 dark:border-primary-500 border-black items-center justify-center text-xl font-semibold text-white 
          dark:hover:bg-primary-700 hover:text-white w-full md:w-60 transition cursor-pointer flex bg-[#0202FF] hover:bg-[#3232ff]'>
                  {routine.name}
                </button>



                {/* Button burguer */}
                <button onClick={() => setMenu(menu === routine.id ? null : routine.id)}
                  className='absolute top-7 right-3 rounded-lg dark:hover:bg-primary-300 hover:bg-black'>
                  {menu === routine.id ? (<X size={30} />) : (<Menu size={30} className='text-white' />)}
                </button>

                {/* Menu */}
                {menu === routine.id && (
                  <div className='absolute top-12 right-2 dark:bg-gray-800 border-2 bg-[#0303be] rounded-xl shadow-lg w-30 z-10'>
                    <button onClick={() => handleEdit(routine)}
                      className='flex items-center gap-2 w-full px-4 py-2 text-white dark:hover:bg-primary-700 hover:bg-[#0000ff] rounded-xl'>
                      <Edit /> Edit
                    </button>


                    <button
                      onClick={() => handleDelete(routine.id)}
                      className='flex items-center gap-2 w-full px-4 py-2 text-white dark:hover:bg-primary-700 hover:bg-[#0000ff] rounded-xl'
                      disabled={loadingDelete === routine.id} 
                    >
                      {loadingDelete === routine.id ? "Deleting..." : <><Trash /> Delete</>}
                    </button>

                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400 text-xl">
              There are no assigned routines
            </p>
          )}
        </div>
      )}
    </div>
  )
}
