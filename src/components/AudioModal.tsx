import React from 'react'

interface AudioModalProps {
  isOpen: boolean
  onClose: () => void
  audioUrl?: string
}

const AudioModal: React.FC<AudioModalProps> = ({
  isOpen,
  onClose,
  audioUrl
}) => {
  if (!isOpen || !audioUrl) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-4xl rounded-lg border-2 border-cyan-800 bg-white p-4 shadow-md">
        <button
          onClick={onClose}
          className="absolute right-0 top-0 mr-2 mt-2 text-3xl text-cyan-800 hover:text-cyan-600"
        >
          &times;
        </button>
        <div className="flex justify-center">
          <audio controls>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  )
}

export default AudioModal
