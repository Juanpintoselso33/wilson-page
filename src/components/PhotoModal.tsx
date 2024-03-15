import React, { useState } from 'react'

interface PhotoModalProps {
  isOpen: boolean
  onClose: () => void
  photoUrls?: string[]
  title?: string // Título de la galería de fotos
  description?: string // Descripción de la galería de fotos
}

const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  onClose,
  photoUrls,
  title,
  description
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!isOpen || !photoUrls || photoUrls.length === 0) return null

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
          {title && (
            <h2 className="mb-3 text-3xl font-semibold text-gray-900">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-md mb-5 text-gray-700">{description}</p>
          )}
        </div>
        <div className="mb-6 flex justify-center">
          <img
            alt={`Preview ${currentImageIndex}`}
            className="rounded-lg object-contain shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl"
            src={photoUrls[currentImageIndex]}
            style={{ maxHeight: '65vh' }}
          />
        </div>
        <div className="flex overflow-x-auto pb-4">
          {photoUrls.map((url, index) => (
            <img
              key={index}
              alt={`Thumbnail ${index}`}
              className={`mr-4 inline-flex rounded-lg object-cover transition-transform duration-300 ease-in-out last:mr-0 hover:scale-110${
                currentImageIndex === index
                  ? 'ring-4 ring-cyan-800'
                  : 'ring-2 ring-gray-300'
              }`}
              src={url}
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
