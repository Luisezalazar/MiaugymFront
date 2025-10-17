import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const EditGoal = () => {
    const { id } = useParams()
    const { user, getToken } = useAuth()
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate()

    const [weight, setWeight] = useState("")
    const [objective, setObjective] = useState("")
    const [images, setImages] = useState([])
    const [imagePreviews, setImagePreviews] = useState([])
    const [existingImages, setExistingImages] = useState([])
    const [imagesToDelete, setImagesToDelete] = useState([])
    const [loading, setLoading] = useState(false)

    // Cargar la meta
    const fetchGoal = async () => {
        if (!user || !id) return
        try {
            const token = await getToken()
            if (!token) return

            const res = await fetch(`${BASE_URL}/goals/getGoal/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (!res.ok) throw new Error("Error fetching goal")
            const data = await res.json()
            setWeight(data.weight)
            setObjective(data.objective)
            setExistingImages(data.images || [])
        } catch (error) {
            console.error("Error loading goal:", error)
        }
    }

    useEffect(() => {
        fetchGoal()
    }, [id, user])

    useEffect(() => {
        return () => {
            imagePreviews.forEach(preview => URL.revokeObjectURL(preview.url))
        }
    }, [imagePreviews])

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        setImages(prev => [...prev, ...files])
        const previews = files.map(file => ({ file, url: URL.createObjectURL(file), id: Date.now() + Math.random() }))
        setImagePreviews(prev => [...prev, ...previews])
    }

    const removeExistingImage = (index) => {
        const image = existingImages[index]
        setImagesToDelete(prev => [...prev, image.id])
        setExistingImages(prev => prev.filter((_, i) => i !== index))
    }

    const removeNewImage = (index) => {
        const image = imagePreviews[index]
        URL.revokeObjectURL(image.url)
        setImagePreviews(prev => prev.filter((_, i) => i !== index))
        setImages(prev => prev.filter((_, i) => i !== index))
    }

    // Drag & drop 
    const handleDragStart = (e, index) => e.dataTransfer.setData("text/plain", index.toString())
    const handleDragOver = (e) => e.preventDefault()
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
        if (!user || !id) return

        try {
            const token = await getToken()
            if (!token) return

            const formData = new FormData()
            formData.append("weight", weight)
            formData.append("objective", objective)
            if (imagesToDelete.length > 0) formData.append("imagesToDelete", JSON.stringify(imagesToDelete))
            images.forEach(img => formData.append("images", img))

            const res = await fetch(`${BASE_URL}/goals/updateGoal/${id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            })

            if (!res.ok) throw new Error("Error updating goal")
            const data = await res.json()
            console.log("Goal updated:", data)
            navigate("/goal")
        } catch (error) {
            console.error("Error updating goal:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='px-6 py-8'>
            <form onSubmit={handleSubmit} className='max-w-4xl mx-auto p-6 dark:bg-neutral-900 bg-[#0202FF] rounded-lg shadow-lg'>
                <h1 className='text-center text-2xl font-bold mb-6'>Edit Record</h1>
                {/* Weight */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2 text-white">Weight:</label>
                    <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)}
                        className='w-full px-4 py-2 text-white border rounded-lg focus:ring-2 focus:ring-primary-500'
                        required
                    />
                </div>
                {/* Objective */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2 text-white">Objective:</label>
                    <input type="text" value={objective} onChange={(e) => setObjective(e.target.value)}
                        className='w-full px-4 py-2 text-white border rounded-lg focus:ring-2 focus:ring-primary-500'
                        required
                    />
                </div>
                {/* Existing images */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2 text-white">Existing Images:</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {existingImages.map((img, idx) => (
                            <div key={img.id} className="relative">
                                <img src={img.url} alt={`Goal ${idx}`} className="w-36 h-36 object-cover rounded-lg" />
                                <button type="button" onClick={() => removeExistingImage(idx)}
                                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {/* New image previews */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2 text-white">Add New Images:</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {imagePreviews.map((preview, idx) => (
                            <div key={preview.id} className="relative" draggable onDragStart={(e) => handleDragStart(e, idx)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, idx)}>
                                <img src={preview.url} alt={`New ${idx}`} className="w-36 h-36 object-cover rounded-lg" />
                                <button type="button" onClick={() => removeNewImage(idx)}
                                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                    <input type="file" multiple accept="image/*" onChange={handleFileChange}
                        className='w-full py-2 px-2 border rounded-lg focus:ring-2 focus:ring-primary-500 bg-neutral-800 text-white'
                    />
                </div>
                {/* Save button */}
                <div className="mt-6 text-right">
                    <button type='submit' className={`px-4 py-2 rounded-lg transition text-white ${loading ? "bg-primary-500 cursor-not-allowed" : "dark:bg-primary-300 dark:text-black border-2 dark:border-black font-semibold dark:hover:bg-primary-600 hover:bg-[#0303be]"}`} disabled={loading}>
                        {loading ? "Updating record..." : "Save Record"}
                    </button>
                </div>
            </form>
        </div>
    )
}
