import React, { useState } from 'react'

interface PhotoModalProps {
  isOpen: boolean
  onClose: () => void
  mediaItem: MediaItem
}

const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  onClose,
  mediaItem
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!isOpen || !mediaItem) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative flex w-full max-w-5xl flex-col rounded-xl border border-gray-100 bg-white p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-4xl font-thin text-cyan-800 transition-colors duration-200 hover:text-cyan-600"
        >
          &times;
        </button>
        <div className="text-center">
          {mediaItem.name && (
            <h2 className="mb-3 text-3xl font-semibold text-gray-900">
              {mediaItem.name}
            </h2>
          )}
          {mediaItem.description && (
            <p className="mb-5 text-gray-700">{mediaItem.description}</p>
          )}
        </div>
        <div className="mb-6 flex justify-center">
          <img
            alt={`Preview ${currentImageIndex}`}
            className="rounded-lg object-contain shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl"
            src={mediaItem.mediaFiles[currentImageIndex].file}
            style={{ maxHeight: '65vh' }}
          />
        </div>
        <div className="flex overflow-x-auto pb-4">
          {mediaItem.mediaFiles.map((mediaFile, index) => (
            <img
              key={index}
              alt={`Thumbnail ${index}`}
              className={`mr-4 inline-flex rounded-lg object-cover transition-transform duration-300 ease-in-out last:mr-0 hover:scale-110${
                currentImageIndex === index
                  ? 'ring-4 ring-cyan-800'
                  : 'ring-2 ring-gray-300'
              }`}
              src={mediaFile.file}
              onClick={() => setCurrentImageIndex(index)}
              style={{ width: '120px', height: '120px' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PhotoModal
