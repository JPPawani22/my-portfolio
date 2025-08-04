import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Check if @vercel/blob is available
    let put: any
    try {
      const { put: blobPut } = await import("@vercel/blob")
      put = blobPut
    } catch (error) {
      return NextResponse.json(
        {
          error: "Vercel Blob not configured. Please install @vercel/blob package and configure your blob store.",
          instructions: "Run: npm install @vercel/blob",
        },
        { status: 500 },
      )
    }

    const { searchParams } = new URL(request.url)
    const filename = searchParams.get("filename")

    if (!filename) {
      return NextResponse.json({ error: "Filename is required" }, { status: 400 })
    }

    const body = await request.blob()

    const blob = await put(filename, body, {
      access: "public",
    })

    return NextResponse.json(blob)
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
