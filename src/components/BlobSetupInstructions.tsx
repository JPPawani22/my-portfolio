"use client"

import { useState } from "react"
import { Terminal, CheckCircle, AlertCircle } from "lucide-react"

export default function BlobSetupInstructions() {
  const [step, setStep] = useState(1)

  const steps = [
    {
      title: "Install Vercel Blob Package",
      command: "npm install @vercel/blob",
      description: "Install the official Vercel Blob SDK",
    },
    {
      title: "Configure Environment Variables",
      command: "# Add to your .env.local file\nBLOB_READ_WRITE_TOKEN=your_token_here",
      description: "Get your token from the Vercel dashboard",
    },
    {
      title: "Deploy to Vercel",
      command: "vercel --prod",
      description: "Deploy your project to activate Blob storage",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-yellow-500 bg-clip-text text-transparent">
          Vercel Blob Setup
        </h1>
        <p className="text-gray-300">Follow these steps to enable file uploads in your portfolio</p>
      </div>

      <div className="space-y-6">
        {steps.map((stepItem, index) => (
          <div
            key={index}
            className={`border rounded-lg p-6 transition-all ${
              step > index + 1
                ? "border-green-500 bg-green-500/10"
                : step === index + 1
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-gray-600 bg-gray-800"
            }`}
          >
            <div className="flex items-center mb-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                  step > index + 1 ? "bg-green-500" : step === index + 1 ? "bg-purple-500" : "bg-gray-600"
                }`}
              >
                {step > index + 1 ? (
                  <CheckCircle size={20} />
                ) : step === index + 1 ? (
                  <AlertCircle size={20} />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </div>
              <h3 className="text-xl font-semibold">{stepItem.title}</h3>
            </div>

            <p className="text-gray-300 mb-4">{stepItem.description}</p>

            <div className="bg-black rounded-lg p-4 font-mono text-sm">
              <div className="flex items-center mb-2">
                <Terminal size={16} className="mr-2 text-green-400" />
                <span className="text-green-400">Terminal</span>
              </div>
              <pre className="text-green-300 whitespace-pre-wrap">{stepItem.command}</pre>
            </div>

            {step === index + 1 && (
              <button
                onClick={() => setStep(step + 1)}
                className="mt-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
              >
                Mark as Complete
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-400 mb-2">What is Vercel Blob?</h3>
        <p className="text-gray-300 mb-4">
          Vercel Blob is a fast, global storage solution for your files. Perfect for:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>Profile images and avatars</li>
          <li>Project screenshots and media</li>
          <li>Documents and assets</li>
          <li>Any files you want to serve globally</li>
        </ul>
      </div>

      <div className="mt-6 text-center">
        <a
          href="https://vercel.com/docs/storage/vercel-blob"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-yellow-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          View Vercel Blob Documentation
        </a>
      </div>
    </div>
  )
}
