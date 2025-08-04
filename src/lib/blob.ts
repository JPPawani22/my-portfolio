// Note: Make sure to install @vercel/blob package first
// Run: npm install @vercel/blob

let put: any, del: any, list: any

try {
  const blobModule = require("@vercel/blob")
  put = blobModule.put
  del = blobModule.del
  list = blobModule.list
} catch (error) {
  console.warn("@vercel/blob package not found. Please install it with: npm install @vercel/blob")
  // Fallback functions for development
  put = async () => ({ url: "/placeholder.svg", pathname: "placeholder" })
  del = async () => true
  list = async () => ({ blobs: [] })
}

export async function uploadToBlob(file: File, filename: string) {
  try {
    const blob = await put(filename, file, {
      access: "public",
    })
    return blob
  } catch (error) {
    console.error("Error uploading to blob:", error)
    throw error
  }
}

export async function deleteFromBlob(url: string) {
  try {
    await del(url)
    return true
  } catch (error) {
    console.error("Error deleting from blob:", error)
    throw error
  }
}

export async function listBlobFiles() {
  try {
    const { blobs } = await list()
    return blobs
  } catch (error) {
    console.error("Error listing blob files:", error)
    throw error
  }
}
