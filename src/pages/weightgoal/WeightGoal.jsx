import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { X } from "lucide-react"
import { Edit, Images, Plus, Scale, Trash2 } from "lucide-react"
import { useLang } from '../../context/LanguageContext'

export const WeightGoal = () => {
  const [goal, setGoal] = useState([])
  const { user, getToken } = useAuth()
  const { t } = useLang()
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

  const hasImages = goal.some((g) => g.images?.length)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

      {/* Encabezado */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{t('goal.title')}</h1>
          {goal.length > 0 && (
            <p className="text-sm text-ink-muted mt-1">
              {goal.length} {goal.length === 1 ? t('goal.record') : t('goal.records')}
            </p>
          )}
        </div>

        <Link to="/createGoal"
          className="flex items-center gap-2 bg-accent text-on-accent hover:bg-accent-hover
            px-4 py-2.5 rounded-lg font-semibold transition shrink-0">
          <Plus size={18} />
          {t('goal.create')}
        </Link>
      </div>

      {/* La ayuda de comparacion solo aparece si hay imagenes que comparar */}
      {hasImages && (
        <p className="text-sm text-ink-muted mb-5 flex items-center gap-2">
          <Images size={16} className="shrink-0" />
          {t('goal.compareHint')}
        </p>
      )}

      {/* Registros: tarjetas en vez de tabla, sin scroll horizontal en mobile */}
      {loading ? (
        /* Esqueletos con la forma de las tarjetas reales: la pagina no salta al cargar */
        <ul className="space-y-3">
          {[0, 1].map((i) => (
            <li key={i} className="bg-raised border border-line rounded-xl p-4 animate-pulse">
              <div className="flex items-start justify-between gap-4">
                <div className="w-full">
                  <div className="h-3 w-20 bg-sunken rounded mb-2" />
                  <div className="h-5 w-40 bg-sunken rounded" />
                </div>
                <div className="h-9 w-24 bg-sunken rounded shrink-0" />
              </div>
            </li>
          ))}
        </ul>
      ) : goal.length > 0 ? (
        <ul className="space-y-3">
          {goal.map((g) => (
            <li key={g.id} className="bg-raised border border-line rounded-xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-xs text-ink-faint">
                    {new Date(g.date).toLocaleDateString('es-AR')}
                  </div>
                  <h2 className="font-semibold text-ink mt-0.5 break-words">{g.objective}</h2>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-2xl font-bold tabular-nums leading-none">{g.weight}</div>
                    <div className="text-xs text-ink-faint mt-0.5">kg</div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Link to={`/editGoal/${g.id}`}
                      aria-label={t('goal.editRecord')}
                      className="p-2 rounded-lg border border-line text-ink-muted
                        hover:text-ink hover:bg-sunken transition">
                      <Edit size={18} />
                    </Link>
                    <button
                      aria-label={t('goal.deleteRecord')}
                      className="p-2 rounded-lg border border-line text-ink-muted
                        hover:text-danger hover:border-danger hover:bg-danger-soft transition"
                      onClick={() => handleDeleteGoal(g.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {g.images?.length ? (
                <div className="flex gap-2 flex-wrap mt-4 pt-4 border-t border-line">
                  {g.images.map((img, index) => {
                    const picked = Boolean(selectedCompareImages.find(i => i.id === img.id))
                    return (
                      <div key={img.id} className="relative">
                        <img
                          src={img.url}
                          alt="Goal"
                          className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition
                            ${picked ? 'ring-2 ring-accent ring-offset-2 ring-offset-raised' : 'hover:opacity-80'}`}
                          onClick={() => openModal(g.images, index)}
                        />
                        <input
                          type="checkbox"
                          aria-label={t('goal.selectCompare')}
                          className="absolute top-1.5 left-1.5 w-4 h-4 cursor-pointer accent-current text-accent"
                          checked={picked}
                          onChange={() => toggleCompareImage(img)}
                        />
                      </div>
                    )
                  })}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center text-center py-16 px-6
          border border-dashed border-line rounded-xl">
          <div className="p-3 rounded-full bg-accent-soft text-accent mb-4">
            <Scale size={28} />
          </div>
          <h2 className="text-lg font-semibold text-ink">{t('goal.emptyTitle')}</h2>
          <p className="text-sm text-ink-muted mt-1.5 max-w-sm">
            {t('goal.emptyText')}
          </p>
          <Link to="/createGoal"
            className="mt-6 flex items-center gap-2 bg-accent text-on-accent hover:bg-accent-hover
              px-4 py-2.5 rounded-lg font-semibold transition">
            <Plus size={18} />
            {t('goal.create')}
          </Link>
        </div>
      )}

      {/* Single Image Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          {selectedImages.length > 1 && (
            <button
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink text-3xl sm:text-5xl font-bold p-3 bg-black/40 rounded-full"
              onClick={(e) => { e.stopPropagation(); prevImage(e) }}
            >
              ‹
            </button>
          )}
          {selectedImages.length > 1 && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ink text-3xl sm:text-5xl font-bold p-3 bg-black/40 rounded-full"
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
            className="absolute top-4 right-4 text-ink sm:text-4xl font-bold bg-black/40 rounded-full p-2"
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
            className="absolute top-4 right-4 text-ink bg-black/40 rounded-full p-2"
            onClick={() => setSelectedCompareImages([])}
          >
            <X size={40} />
          </button>

          <h2 className="text-ink text-2xl font-bold mb-6">{t('goal.comparing')}</h2>

          <div className="flex flex-wrap justify-center gap-8 px-4">
            {selectedCompareImages.map((img) => (
              <div key={img.id} className="text-center text-ink">
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
