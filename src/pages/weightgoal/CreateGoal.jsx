import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Info } from 'lucide-react'
import { useLang } from '../../context/LanguageContext'

export const CreateGoal = () => {

    const [weight, setWeight] = useState("")
    const [objective, setObjective] = useState("")
    const [images, setImages] = useState([])
    const [imagePreviews, setImagePreviews] = useState([])
    const [loading, setLoading] = useState(false)
    const { t } = useLang()

    const { user, getToken } = useAuth()
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate()

    useEffect(() => {
        return () => {
            imagePreviews.forEach(preview => URL.revokeObjectURL(preview.url))
        }
    }, [imagePreviews])

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        setImages(prev => [...prev, ...files])

        const previews = files.map(file => ({
            file,
            url: URL.createObjectURL(file),
            id: Date.now() + Math.random()
        }))
        setImagePreviews(prev => [...prev, ...previews])
    }

    const removeImage = (index) => {
        const imageToRemove = imagePreviews[index]
        URL.revokeObjectURL(imageToRemove.url)
        setImagePreviews(prev => prev.filter((_, i) => i !== index))
        setImages(prev => prev.filter((_, i) => i !== index))
    }

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData("text/plain", index.toString())
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e, dropIndex) => {
        e.preventDefault()
        const dragIndex = parseInt(e.dataTransfer.getData("text/plain"))

        const newPreviews = [...imagePreviews]
        const newFiles = [...images]

        const draggedPreview = newPreviews[dragIndex]
        const draggedFile = newFiles[dragIndex]

        newPreviews.splice(dragIndex, 1)
        newPreviews.splice(dropIndex, 0, draggedPreview)

        newFiles.splice(dragIndex, 1)
        newFiles.splice(dropIndex, 0, draggedFile)

        setImagePreviews(newPreviews)
        setImages(newFiles)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const token = getToken()
        if (!user || !token) {
            console.error("User or token not found")
            setLoading(false)
            return
        }

        const formData = new FormData()
        formData.append("weight", weight)
        formData.append("objective", objective)
        images.forEach(img => formData.append("images", img))

        try {
            const response = await fetch(`${BASE_URL}/goals/createGoal`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            })

            const data = await response.json()
            if (response.ok) {
                console.log("Goal created:", data.goal)
                setTimeout(() => navigate("/goal"), 1000)
            }
        } catch (error) {
            console.error("Error creating goal:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='px-6 py-8'>
            <form
                onSubmit={handleSubmit}
                className='max-w-4xl mx-auto p-6 bg-raised rounded-lg shadow-lg'
            >
                <h1 className='text-center text-2xl font-bold mb-6'>
                    {t('goal.create')}
                </h1>

                {/* Weight */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2 text-ink">{t('goal.weight')}</label>
                    <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)}
                        className='w-full px-3 py-2.5 rounded-lg bg-sunken border border-line text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition'
                        placeholder='' required
                    />
                </div>

                {/* Objective */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2 text-ink">{t('goal.objective')}</label>
                    <input type="text" value={objective} onChange={(e) => setObjective(e.target.value)}
                        className='w-full px-3 py-2.5 rounded-lg bg-sunken border border-line text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition'
                        placeholder='' required
                    />
                </div>

                {/* Image previews */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2 text-ink">{t('goal.images')}</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {imagePreviews.map((preview, idx) => (
                            <div
                                key={preview.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, idx)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, idx)}
                                className="relative cursor-move rounded-lg border-2 border-transparent hover:border-accent transition-all"
                            >
                                <img
                                    src={preview.url}
                                    alt={`Goal ${idx + 1}`}
                                    className="w-36 h-36 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(idx)}
                                    className="absolute top-1 right-1 bg-red-600 text-white hover:bg-red-700 rounded-full w-6 h-6 flex items-center justify-center text-sm"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                    {/* File input */}
                    <input type="file" multiple accept="image/*" onChange={handleFileChange}
                        className='w-full text-sm text-ink-muted rounded-lg border border-dashed border-line px-3 py-3 cursor-pointer transition hover:border-accent file:mr-3 file:px-3 file:py-1.5 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-on-accent file:cursor-pointer'
                    />
                </div>

                <div className='flex items-start gap-2.5 bg-sunken border border-line rounded-lg px-3 py-3 mt-4'>
                    <Info size={16} className='shrink-0 mt-0.5 text-ink-faint' />
                    <p className='text-sm text-ink-muted'>
                        {t('goal.photoNote')}
                    </p>
                </div>

                {/* Save button */}
                <div className="mt-6 text-right">
                    <button
                        type='submit'
                        className='w-full mt-2 px-4 py-2.5 rounded-lg font-semibold bg-accent text-on-accent hover:bg-accent-hover transition disabled:opacity-60 disabled:cursor-not-allowed'
                        disabled={loading}
                    >
                        {loading ? t('goal.creating') : t('goal.save')}
                    </button>
                </div>
            </form>

            {/* Modal loading */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-raised border border-line p-8 rounded-2xl shadow-xl text-center min-w-[16rem]">
                        <p className="text-xl font-bold mb-4 text-ink">{t('goal.creating')}</p>
                        <div className="progress-track" />
                    </div>
                </div>
            )}
        </div>
    )
}
