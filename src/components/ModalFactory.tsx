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

  const { category } = selectedMediaItem

  switch (category) {
    case 'video':
      return (
        <VideoModal
          isOpen={isOpen}
          setIsOpen={onClose} // Cambio aquí: onClose por setIsOpen
          mediaItem={selectedMediaItem} // Asegúrate de que selectedMediaItem tenga la estructura correcta
        />
      )
    case 'fotos':
      return (
        <PhotoModal
          isOpen={isOpen}
          onClose={onClose}
          mediaItem={selectedMediaItem} // Adjust PhotoModal to accept a MediaItem
        />
      )
    case 'audio':
      return (
        <AudioModal
          isOpen={isOpen}
          onClose={onClose}
          mediaItem={selectedMediaItem} // Adjust AudioModal to accept a MediaItem
        />
      )
    default:
      return null // or a default modal
  }
}

export default ModalFactory
