import React, { createContext, ReactNode, useContext, useState } from 'react'

interface MediaContextType {
  mediaItems: any[] // Consider specifying a more specific type instead of any if possible
  setMediaItems: React.Dispatch<React.SetStateAction<any[]>>
}

const MediaContext = createContext<MediaContextType | undefined>(undefined)

export const useMedia = () => {
  const context = useContext(MediaContext)
  if (context === undefined) {
    throw new Error('useMedia must be used within a MediaProvider')
  }
  return context
}

export const MediaProvider = ({ children }: { children: ReactNode }) => {
  const [mediaItems, setMediaItems] = useState<any[]>([]) // Consider specifying a more specific type instead of any

  return (
    <MediaContext.Provider value={{ mediaItems, setMediaItems }}>
      {children}
    </MediaContext.Provider>
  )
}
