import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

interface MediaItem {
  name?: string
  description?: string
  media_files?: Array<{
    id: number
    filename: string
  }>
  category?: string
  creator?: string
  status?: string
  publish_date?: string
  mediaFileUrls?: string[]
}

interface MediaContextType {
  mediaItems: MediaItem[] // Use MediaItem[] instead of any[]
  setMediaItems: React.Dispatch<React.SetStateAction<MediaItem[]>>
  isModalOpen: boolean // Add this line
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> // And this line
  selectedMediaItem?: MediaItem // Add this line, adjust the type as needed
  setSelectedMediaItem: React.Dispatch<
    React.SetStateAction<MediaItem | undefined>
  > // Add this line
  currentFilter: string // Added line for filtering
  setCurrentFilter: React.Dispatch<React.SetStateAction<string>> // Added line for filtering
}

const defaultContextValue: MediaContextType = {
  mediaItems: [],
  setMediaItems: () => {},
  isModalOpen: false,
  setIsModalOpen: (value: boolean | ((val: boolean) => boolean)) => {}, // Modified for debugging
  selectedMediaItem: undefined, // Initialize selectedMediaItem
  setSelectedMediaItem: () => {}, // Add this line
  currentFilter: 'all', // Default to showing all items
  setCurrentFilter: () => {} // Added line for filtering
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
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]) // Consider specifying a more specific type instead of any
  const [isModalOpen, setIsModalOpen] = useState(false) // Add this line
  const [selectedMediaItem, setSelectedMediaItem] = useState<
    MediaItem | undefined
  >(undefined) // Initialize selectedMediaItem
  const [currentFilter, setCurrentFilter] = useState('all') // Added line for filtering

  // Modification for debugging: wrap setIsModalOpen to add console.log
  const setIsModalOpenDebug = (
    value: boolean | ((val: boolean) => boolean)
  ) => {
    console.log('Modal Open State Changing To:', value)
    setIsModalOpen(value)
  }

  return (
    <MediaContext.Provider
      value={{
        mediaItems,
        setMediaItems,
        isModalOpen,
        setIsModalOpen: setIsModalOpenDebug, // Use the modified version for debugging
        selectedMediaItem,
        setSelectedMediaItem, // Expose setSelectedMediaItem through the context
        currentFilter, // Added line for filtering
        setCurrentFilter // Added line for filtering
      }}
    >
      {children}
    </MediaContext.Provider>
  )
}
