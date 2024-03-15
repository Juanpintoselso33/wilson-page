import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

interface InfoCardDetailModalProps {
  isOpen: boolean
  onClose: () => void
  name: string
  description: string
  mediaFileUrls?: string[]
  category?: string
  creator?: string
  status?: string
  publishDate?: string
}

const InfoCardDetailModal: React.FC<InfoCardDetailModalProps> = ({
  isOpen,
  onClose,
  name,
  description,
  category,
  mediaFileUrls
}) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    console.log('Modal isOpen state:', isOpen)
    console.log('Modal Props Updated:', {
      name,
      description,
      category,
      mediaFileUrls
    })
  }, [isOpen, name, description, category, mediaFileUrls])
  if (!isOpen) return null

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setIsImageModalOpen(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-4xl rounded-lg border-2 border-cyan-800 bg-white p-4 shadow-md">
        <button
          onClick={onClose}
          className="absolute right-0 top-0 mr-2 mt-2 text-3xl text-cyan-800 hover:text-cyan-600"
        >
          &times;
        </button>
        <h2>{name}</h2>
        <p>{description}</p>
        {category && <p>Category: {category}</p>}
        {category === 'video' && mediaFileUrls && (
          <div className="flex justify-center">
            <video controls style={{ maxHeight: '500px', width: 'auto' }}>
              <source src={mediaFileUrls[0]} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        {mediaFileUrls && category === 'fotos' && (
          <div className="grid grid-cols-3 gap-4">
            {mediaFileUrls.map((url, index) => (
              <img
                key={index}
                alt={`Media ${index}`}
                className="cursor-pointer object-cover transition-opacity duration-500 ease-in-out"
                style={{ height: '200px', objectFit: 'cover' }}
                src={url}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        )}
        {isImageModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <img
              alt={`Media ${currentImageIndex}`}
              className="rounded-lg object-cover transition-opacity duration-500 ease-in-out"
              src={mediaFileUrls ? mediaFileUrls[currentImageIndex] : ''}
              style={{ maxHeight: '80%', maxWidth: '80%' }}
              onClick={() => setIsImageModalOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default InfoCardDetailModal
