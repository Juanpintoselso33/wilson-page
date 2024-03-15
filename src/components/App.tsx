// src/components/App.tsx
import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { MediaContext } from '../contexts/MediaContext'
import { MediaItem } from '../types/mediaItem.types'
import AdminPanel from './AdminPage'
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
    <Router>
      <div className="flex flex-col justify-center bg-gray-300">
        <NavBar />
        <Routes>
          <Route path="/" element={<MainHero />} />
          <Route path="/admin" element={<AdminPanel />} />
          {/* Define más rutas según sea necesario */}
        </Routes>
        <SectionBar />
        <div className="mt-4 flex flex-col items-center">
          <InfoCardsSection />
        </div>
        <ModalFactory
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedMediaItem={selectedMediaItem as MediaItem}
        />
      </div>
    </Router>
  )
}

export default App
