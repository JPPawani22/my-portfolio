"use client"

import { useState, useEffect } from "react"
import BlobSetupInstructions from "@/components/BlobSetupInstructions"
import ProjectImageManager from "@/components/ProjectImageManager"

interface BlobFile {
  url: string
  pathname: string
  size: number
  uploadedAt: Date
}

export default function AdminPanel() {
  const [blobFiles, setBlobFiles] = useState<BlobFile[]>([])
  const [loading, setLoading] = useState(true)
  const [blobConfigured, setBlobConfigured] = useState(false)
  const [projectImages, setProjectImages] = useState<any[]>([])

  useEffect(() => {
    checkBlobConfiguration()
  }, [])

  const checkBlobConfiguration = async () => {
    try {
      // Try to import and use the blob package
      const { list } = await import("@vercel/blob")
      const files = await list()
      setBlobFiles(files.blobs)
      setBlobConfigured(true)
    } catch (error) {
      console.log("Blob not configured:", error)
      setBlobConfigured(false)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p>Checking Blob configuration...</p>
        </div>
      </div>
    )
  }

  if (!blobConfigured) {
    return <BlobSetupInstructions />
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-yellow-500 bg-clip-text text-transparent">
          Portfolio Admin Panel
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Blob Files Manager */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {blobFiles.length === 0 ? (
                <p className="text-gray-400">No files uploaded yet</p>
              ) : (
                blobFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded">
                    <div>
                      <p className="font-medium">{file.pathname}</p>
                      <p className="text-sm text-gray-400">
                        {(file.size / 1024).toFixed(1)} KB • {new Date(file.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      View
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Project Image Manager */}
          <div className="bg-gray-800 rounded-lg p-6">
            <ProjectImageManager projectId="sample-project" images={projectImages} onImagesUpdate={setProjectImages} />
          </div>
        </div>

        <div className="mt-8 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
          <h3 className="text-lg font-semibold text-green-400 mb-2">✅ Vercel Blob Configured</h3>
          <p className="text-gray-300">Your portfolio is ready to handle file uploads! You can:</p>
          <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1">
            <li>Upload profile images for the About section</li>
            <li>Add project screenshots and media</li>
            <li>Store and serve any assets for your portfolio</li>
            <li>Manage all uploaded files from this admin panel</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
