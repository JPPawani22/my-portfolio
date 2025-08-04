"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X } from "lucide-react"

interface ImageUploadProps {
  onImageUpload: (url: string) => void
  currentImage?: string
}

export default function ImageUpload({ onImageUpload, currentImage }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    setUploading(true)
    try {
      const filename = `profile-${Date.now()}-${file.name}`
      const response = await fetch(`app/api/upload?filename=${encodeURIComponent(filename)}`, {
        method: "POST",
        body: file,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const blob = await response.json()
      onImageUpload(blob.url)
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  return (
    <div className="relative">
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
          dragOver ? "border-purple-500 bg-purple-500/10" : "border-gray-600 hover:border-purple-500"
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
      >
        {currentImage ? (
          <div className="relative">
            <img
              src={currentImage || "/placeholder.svg"}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full mx-auto mb-2"
            />
            <button
              onClick={() => onImageUpload("")}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="py-8">
            <Upload className="mx-auto mb-2 text-gray-400" size={32} />
            <p className="text-gray-400 mb-2">{uploading ? "Uploading..." : "Drop your profile image here"}</p>
            <p className="text-sm text-gray-500">or click to browse</p>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
      </div>
    </div>
  )
}
