import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const CreateGoal = () => {

    const [weight, setWeight] = useState("")
    const [objective, setObjective] = useState("")
    const [images, setImages] = useState([])
    const [imagePreviews, setImagePreviews] = useState([])
    const [loading, setLoading] = useState(false)

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
                className='max-w-4xl mx-auto p-6 dark:bg-neutral-900 bg-[#0202FF] rounded-lg shadow-lg'
            >
                <h1 className='text-center text-2xl font-bold mb-6'>
                    Create record
                </h1>

                {/* Weight */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2 text-white">Weight:</label>
                    <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)}
                        className='w-full px-4 py-2 text-white border rounded-lg focus:ring-2 focus:ring-primary-500'
                        placeholder='' required
                    />
                </div>

                {/* Objective */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2 text-white">Objective:</label>
                    <input type="text" value={objective} onChange={(e) => setObjective(e.target.value)}
                        className='w-full px-4 py-2 text-white border rounded-lg focus:ring-2 focus:ring-primary-500'
                        placeholder='' required
                    />
                </div>

                {/* Image previews */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2 text-white">Images:</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {imagePreviews.map((preview, idx) => (
                            <div
                                key={preview.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, idx)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, idx)}
                                className="relative cursor-move rounded-lg border-2 border-transparent hover:border-blue-500 transition-all"
                            >
                                <img
                                    src={preview.url}
                                    alt={`Goal ${idx + 1}`}
                                    className="w-36 h-36 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(idx)}
                                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                    {/* File input */}
                    <input type="file" multiple accept="image/*" onChange={handleFileChange}
                        className='w-full py-2 px-2 border rounded-lg focus:ring-2 focus:ring-primary-500 bg-neutral-800 text-white'
                    />
                </div>

                {/* Save button */}
                <div className="mt-6 text-right">
                    <button
                        type='submit'
                        className={`px-4 py-2 rounded-lg transition text-white ${loading
                            ? "bg-primary-500 cursor-not-allowed"
                            : "dark:bg-primary-300 dark:text-black border-2 dark:border-black font-semibold dark:hover:bg-primary-600 hover:bg-[#0303be]"
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Creating record..." : "Save Record"}
                    </button>
                </div>
            </form>

            {/* Modal loading */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-neutral-800 p-8 rounded-2xl shadow-xl text-center">
                        <p className="text-xl font-bold mb-4 text-white">Creating record...</p>
                        <div className="w-64 bg-neutral-200 rounded-full h-4 overflow-hidden">
                            <div className="bg-primary-600 h-4 animate-pulse w-1/2"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
