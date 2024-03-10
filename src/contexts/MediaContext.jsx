import React, { createContext, useContext, useState } from 'react'

const MediaContext = createContext()

export const useMedia = () => useContext(MediaContext)

export const MediaProvider = ({ children }) => {
  const [mediaItems, setMediaItems] = useState([])

  // Funciones para interactuar con el backend aquí

  return (
    <MediaContext.Provider value={{ mediaItems, setMediaItems }}>
      {children}
    </MediaContext.Provider>
  )
}
