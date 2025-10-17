import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { X } from "lucide-react"
import { Edit, Trash2 } from "lucide-react"

export const WeightGoal = () => {
  const [goal, setGoal] = useState([])
  const { user, getToken } = useAuth()
  const [loading, setLoading] = useState(false)

  // Modal single image
  const [selectedImages, setSelectedImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  // Comparison modal
  const [selectedCompareImages, setSelectedCompareImages] = useState([])

  // Mobile touch state
  const [touchStartX, setTouchStartX] = useState(null)
  const [touchEndX, setTouchEndX] = useState(null)

  const BASE_URL = import.meta.env.VITE_BASE_URL

  // Fetch goals
  const fetchGoals = async () => {
    const token = await getToken()
    if (!user || !token) return

    try {
      setLoading(true)
      const response = await fetch(`${BASE_URL}/goals/getPersonGoals`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        const data = await response.json()
        setGoal(data || [])
      } else setGoal([])
    } catch (error) {
      console.error('Error fetching user goals:', error)
      setGoal([])
    } finally {
      setLoading(false)
    }
  }

  //DeleteGoal
  const handleDeleteGoal = async (goalId) => {
    if (!confirm("Are you sure you want to delete this record?")) return
    const token = await getToken()
    try {
      const res = await fetch(`${BASE_URL}/goals/deleteGoal/${goalId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      if (res.ok) {
        setGoal(prev => prev.filter(g => g.id !== goalId))
        console.log("Goal deleted")
      }
    } catch (error) {
      console.error("Error deleting goal:", error)
    }
  }

  useEffect(() => {
    fetchGoals()
  }, [user])


  // Single image modal
  const openModal = (images, index) => {
    setSelectedImages(images)
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setSelectedImages([])
    setCurrentIndex(0)
    setTouchStartX(null)
    setTouchEndX(null)
    setSelectedCompareImages([])
  }

  const nextImage = (e) => {
    if (e) e.stopPropagation()
    if (!selectedImages || selectedImages.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % selectedImages.length)
  }

  const prevImage = (e) => {
    if (e) e.stopPropagation()
    if (!selectedImages || selectedImages.length === 0) return
    setCurrentIndex((prev) =>
      prev === 0 ? selectedImages.length - 1 : prev - 1
    )
  }

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX)
  const handleTouchMove = (e) => setTouchEndX(e.touches[0].clientX)
  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return
    const delta = touchStartX - touchEndX
    const threshold = 50
    if (delta > threshold) setCurrentIndex((prev) => (prev + 1) % selectedImages.length)
    else if (delta < -threshold) setCurrentIndex((prev) => (prev === 0 ? selectedImages.length - 1 : prev - 1))
    setTouchStartX(null)
    setTouchEndX(null)
  }


  // Comparison selection
  const toggleCompareImage = (img) => {
    setSelectedCompareImages((prev) => {
      if (prev.find((i) => i.id === img.id)) {
        return prev.filter((i) => i.id !== img.id)
      } else if (prev.length < 2) {
        return [...prev, img]
      } else {
        return prev
      }
    })
  }

  return (
    <div className="items-center justify-center text-center">
      <h1 className="font-bold text-center text-3xl py-4">Weight Record</h1>

      <div className="flex justify-center mt-4">
        <Link to="/createGoal">
          <button
            type="button"
            className="flex items-center dark:bg-primary-300 dark:text-black text-white
                       px-4 py-2 rounded-lg dark:hover:bg-primary-500 transition mb-6 cursor-pointer dark:border-black dark:border-2 font-bold
                       bg-[#0202FF] hover:bg-[#3232ff]"
          >
            Create register
          </button>
        </Link>
      </div>

      <h2 className="font-semibold text-2xl py-4">
        Would you like to compare your records?
      </h2>

      <p>You just have to mark the 2 images you want to compare</p>

      <h2 className="font-semibold text-2xl py-4">Registration List</h2>

      <div className="overflow-x-auto py-4 px-4">
        <table className="w-full border-collapse border-black">
          <thead>
            <tr className="dark:bg-black bg-[#0202FF] text-white">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Goal</th>
              <th className="px-4 py-2">Weight</th>
              <th className="px-4 py-2">Images</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {goal.length > 0 ? (
              goal.map((g) => (
                <tr key={g.id} className="text-center border-t border-black">
                  <td className='px-4 py-2'>{new Date(g.date).toLocaleDateString('es-AR')}</td>
                  <td className="px-4 py-2">{g.objective}</td>
                  <td className="px-4 py-2">{g.weight}</td>
                  <td className="px-4 py-2 flex justify-center gap-2 flex-wrap">

                    {g.images?.length ? (
                      g.images.map((img, index) => (
                        <div key={img.id} className="relative">
                          <img
                            src={img.url}
                            alt="Goal"
                            className={`w-16 h-16 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform
                              ${selectedCompareImages.find(i => i.id === img.id) ? 'ring-4 ring-blue-500' : ''}`}
                            onClick={() => openModal(g.images, index)}
                          />
                          <input
                            type="checkbox"
                            className="absolute top-1 left-1 w-4 h-4 cursor-pointer"
                            checked={selectedCompareImages.find(i => i.id === img.id) ? true : false}
                            onChange={() => toggleCompareImage(img)}
                          />
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-500">No images</span>
                    )}
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex justify-center gap-2">
                      <Link to={`/editGoal/${g.id}`}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center">
                          <Edit size={18} />
                        </button>
                      </Link>

                      <button
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg flex items-center justify-center"
                        onClick={() => handleDeleteGoal(g.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-2 py-2 text-center">No records found</td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

      {/* Single Image Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          {selectedImages.length > 1 && (
            <button
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-3xl sm:text-5xl font-bold p-3 bg-black/40 rounded-full"
              onClick={(e) => { e.stopPropagation(); prevImage(e) }}
            >
              ‹
            </button>
          )}
          {selectedImages.length > 1 && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-3xl sm:text-5xl font-bold p-3 bg-black/40 rounded-full"
              onClick={(e) => { e.stopPropagation(); nextImage(e) }}
            >
              ›
            </button>
          )}
          <div
            className="max-w-[95vw] max-h-[80vh] flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={(e) => { e.stopPropagation(); handleTouchEnd(e) }}
            style={{ touchAction: 'pan-y pinch-zoom' }}
          >
            <img
              src={selectedImages[currentIndex]?.url}
              alt="Full view"
              className="max-w-full max-h-full rounded-lg shadow-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <button
            className="absolute top-4 right-4 text-white sm:text-4xl font-bold bg-black/40 rounded-full p-2"
            onClick={(e) => { e.stopPropagation(); closeModal() }}
          >
            <X size={40} />
          </button>
        </div>
      )}


      {/* Comparison Modal */}
      {selectedCompareImages.length === 2 && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 p-4 overflow-auto">
          <button
            className="absolute top-4 right-4 text-white bg-black/40 rounded-full p-2"
            onClick={() => setSelectedCompareImages([])}
          >
            <X size={40} />
          </button>

          <h2 className="text-white text-2xl font-bold mb-6">Comparing Images</h2>

          <div className="flex flex-wrap justify-center gap-8 px-4">
            {selectedCompareImages.map((img) => (
              <div key={img.id} className="text-center text-white">
                <img
                  src={img.url}
                  alt="Goal"
                  className="w-full h-80 object-cover rounded-lg border-4 border-white shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
