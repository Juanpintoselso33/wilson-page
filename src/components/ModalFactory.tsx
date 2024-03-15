import React from 'react'

// Assuming selectedMediaItem has a type, import it
import { MediaItem } from '../types/mediaItem.types'
import AudioModal from './AudioModal'
import PhotoModal from './PhotoModal'
import VideoModal from './VideoModal'

interface ModalFactoryProps {
  isOpen: boolean
  onClose: () => void
  selectedMediaItem?: MediaItem
}

const ModalFactory: React.FC<ModalFactoryProps> = ({
  isOpen,
  onClose,
  selectedMediaItem
}) => {
  if (!selectedMediaItem) return null

  const { category, name, description, mediaFileUrls } = selectedMediaItem

  switch (category) {
    case 'video':
      return (
        <VideoModal
          isOpen={isOpen}
          setIsOpen={onClose} // Cambio aquí: onClose por setIsOpen
          video={selectedMediaItem} // Asegúrate de que selectedMediaItem tenga la estructura correcta
        />
      )
    case 'fotos':
      return (
        <PhotoModal
          isOpen={isOpen}
          onClose={onClose}
          photoUrls={mediaFileUrls}
          title={name}
          description={description}
        />
      )
    case 'audio':
      return (
        <AudioModal
          isOpen={isOpen}
          onClose={onClose}
          audioUrl={mediaFileUrls?.[0]}
        />
      )
    default:
      return null // or a default modal
  }
}

export default ModalFactory
