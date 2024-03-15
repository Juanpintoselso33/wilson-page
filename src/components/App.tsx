// src/components/App.tsx
import React, { useContext } from 'react'

import { MediaContext } from '../contexts/MediaContext'
import { MediaItem } from '../types/mediaItem.types'
import InfoCardsSection from './InfoCardsSection'
import MainHero from './MainHero'
import ModalFactory from './ModalFactory'
import NavBar from './NavBar'
import SectionBar from './SectionBar'

const App = () => {
  const { isModalOpen, setIsModalOpen, selectedMediaItem } =
    useContext(MediaContext) // Use modal state and selectedMediaItem
  console.log('Modal open state in parent:', isModalOpen)
  return (
    <div className="flex flex-col justify-center bg-gray-300">
      <NavBar />
      <MainHero />
      <SectionBar />
      <div className="mt-4 flex flex-col items-center">
        <InfoCardsSection />
      </div>
      <ModalFactory
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedMediaItem={selectedMediaItem}
      />
    </div>
  )
}

export default App
