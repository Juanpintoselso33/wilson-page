import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'

import { infoCard } from '../config/index.json'
import { MediaContext } from '../contexts/MediaContext'
import { MediaFile } from '../types'

interface InfoCardProps {
  id: number
  name: string
  description: string
  category: string
  creator: string
  previewUrl?: string
  status: string
  publishDate?: string
  mediaFiles: MediaFile[]
  created_at: string
  updated_at: string
  tags: string[]
  // Añade aquí cualquier otra propiedad relevante que necesites
}
const InfoCard: React.FC<InfoCardProps> = ({
  id,
  name,
  description,
  category,
  creator,
  previewUrl,
  status,
  publishDate,
  mediaFiles,
  created_at,
  updated_at,
  tags
  // Desestructura aquí cualquier otra propiedad relevante
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { setSelectedMediaItem, setIsModalOpen: setModalOpen } =
    useContext(MediaContext)

  let displayUrl = mediaFiles[0].file
  if (category === 'video') {
    displayUrl = mediaFiles[0].thumbnail
  }

  return (
    <div className="mx-auto w-full max-w-lg overflow-hidden rounded-lg border-cyan-800 bg-white shadow-lg transition-transform hover:scale-105">
      <div className="p-4">
        <div className="mb-2 text-center text-sm font-medium uppercase text-cyan-800">
          {category}
        </div>
        <hr className="border-t border-gray-200" />
        <h2 className="my-4 text-center text-2xl font-bold text-cyan-800">
          {name}
        </h2>
        <div className="relative mx-auto mb-4 h-64 w-full">
          {/* Image and navigation buttons */}
          {mediaFiles.length > 1 && category === 'fotos' ? (
            <>
              <img
                alt="Media Thumbnail"
                className="h-full w-full rounded-lg object-cover transition-opacity duration-500 ease-in-out"
                src={mediaFiles[currentImageIndex].file}
              />
              <button
                className="absolute inset-y-0 left-0 z-10 flex items-center justify-center p-2 text-cyan-800 transition-colors duration-200 hover:bg-cyan-100/50"
                onClick={() =>
                  setCurrentImageIndex(
                    currentImageIndex > 0
                      ? currentImageIndex - 1
                      : mediaFiles.length - 1
                  )
                }
              >
                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
              </button>
              <button
                className="absolute inset-y-0 right-0 z-10 flex items-center justify-center p-2 text-cyan-800 transition-colors duration-200 hover:bg-cyan-100/50"
                onClick={() =>
                  setCurrentImageIndex(
                    currentImageIndex < mediaFiles.length - 1
                      ? currentImageIndex + 1
                      : 0
                  )
                }
              >
                <FontAwesomeIcon icon={faArrowRight} size="lg" />
              </button>
            </>
          ) : (
            <img
              alt="Media Thumbnail"
              className="h-full w-full rounded-lg object-cover transition-opacity duration-500 ease-in-out"
              src={displayUrl}
            />
          )}
        </div>
        <hr className="border-t border-gray-200" />
        <div className="my-4 text-center">
          <p className="text-lg font-medium text-gray-900">Descripción</p>
          <p className="text-sm text-gray-700">{description}</p>
        </div>
      </div>
      <div className="flex justify-center p-4">
        <button
          className="rounded-lg bg-cyan-800 px-5 py-2 text-lg text-white transition-colors duration-150 ease-in-out hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-800 focus:ring-offset-2"
          onClick={() => {
            setModalOpen(true)
            setSelectedMediaItem({
              id,
              name,
              description,
              category,
              creator,
              previewUrl,
              status,
              publishDate,
              mediaFiles,
              created_at,
              updated_at,
              tags
            })
          }}
        >
          {infoCard.buttonText || 'Ver Más'}
        </button>
      </div>
    </div>
  )
}

export default InfoCard
