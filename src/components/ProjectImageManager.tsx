"use client"

import { useState } from "react"
import { Upload, X, ExternalLink } from "lucide-react"

interface ProjectImage {
  id: string
  url: string
  filename: string
}

interface ProjectImageManagerProps {
  projectId: string
  images: ProjectImage[]
  onImagesUpdate: (images: ProjectImage[]) => void
}

export default function ProjectImageManager({ projectId, images, onImagesUpdate }: ProjectImageManagerProps) {
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    setUploading(true)
    try {
      const filename = `project-${projectId}-${Date.now()}-${file.name}`
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(filename)}`, {
        method: "POST",
        body: file,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const blob = await response.json()
      const newImage: ProjectImage = {
        id: Date.now().toString(),
        url: blob.url,
        filename: blob.pathname,
      }

      onImagesUpdate([...images, newImage])
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  const handleImageDelete = (imageId: string) => {
    const updatedImages = images.filter((img) => img.id !== imageId)
    onImagesUpdate(updatedImages)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Project Images</h3>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-purple-500 transition-colors">
        <Upload className="mx-auto mb-2 text-gray-400" size={24} />
        <p className="text-gray-400 mb-2">{uploading ? "Uploading..." : "Add project images"}</p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files || [])
            files.forEach(handleImageUpload)
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.url || "/placeholder.svg"}
                alt="Project"
                className="w-full h-24 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                <button
                  onClick={() => window.open(image.url, "_blank")}
                  className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <ExternalLink size={16} />
                </button>
                <button
                  onClick={() => handleImageDelete(image.id)}
                  className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
