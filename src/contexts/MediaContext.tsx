// src/contexts/MediaContext.tsx
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

import { fetchMediaItems } from '../api/mediaService'
import { MediaItem } from '../types/mediaItem.types' // Asegúrate de ajustar esta ruta de importación.

interface MediaContextType {
  mediaItems: MediaItem[]
  setMediaItems: React.Dispatch<React.SetStateAction<MediaItem[]>>
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedMediaItem?: MediaItem
  setSelectedMediaItem: React.Dispatch<
    React.SetStateAction<MediaItem | undefined>
  >
  currentFilter: string
  setCurrentFilter: React.Dispatch<React.SetStateAction<string>>
}

const defaultContextValue: MediaContextType = {
  mediaItems: [],
  setMediaItems: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {},
  selectedMediaItem: undefined,
  setSelectedMediaItem: () => {},
  currentFilter: 'all',
  setCurrentFilter: () => {}
}

export const MediaContext = createContext<MediaContextType>(defaultContextValue)

export const useMedia = () => {
  const context = useContext(MediaContext)
  if (context === undefined) {
    throw new Error('useMedia must be used within a MediaProvider')
  }
  return context
}

export const MediaProvider = ({ children }: { children: ReactNode }) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMediaItem, setSelectedMediaItem] = useState<
    MediaItem | undefined
  >()
  const [currentFilter, setCurrentFilter] = useState('all')

  // Imagina que aquí tienes una función para cargar los mediaItems desde tu backend.
  useEffect(() => {
    const loadItems = async () => {
      try {
        const items = await fetchMediaItems()
        setMediaItems(items)
        console.log('Media items loaded:', items)
      } catch (error) {
        console.error('Failed to load media items:', error)
      }
    }

    loadItems()
  }, [])

  return (
    <MediaContext.Provider
      value={{
        mediaItems,
        setMediaItems,
        isModalOpen,
        setIsModalOpen,
        selectedMediaItem,
        setSelectedMediaItem,
        currentFilter,
        setCurrentFilter
      }}
    >
      {children}
    </MediaContext.Provider>
  )
}
