// src/components/App.tsximport { Refine, useMany } from "@refinedev/core";
import React, { useContext } from 'react'
import {Route, Routes, useLocation } from 'react-router-dom'
import { MediaContext } from '../contexts/MediaContext'
import { MediaItem } from '../types/mediaItem.types'
import AdminDashboard from './AdminDashboard'
import AdminPage from './AdminPage'
import InfoCardsSection from './InfoCardsSection'
import MainHero from './MainHero'
import ModalFactory from './ModalFactory'
import NavBar from './NavBar'
import SectionBar from './SectionBar'
import MediaItemList from './MediaItemList' // Import corrected based on file_context_3
import MediaItemCreate from './MediaItemCreate' // Assuming a similar structure for MediaItemCreate
import MediaItemEdit from './MediaItemEdit' // Assuming a similar structure for MediaItemEdit

const App = () => {
  const { isModalOpen, setIsModalOpen, selectedMediaItem } =
    useContext(MediaContext)
  const location = useLocation();

  return (
      <div className="flex flex-col justify-center bg-gray-300">
        <NavBar />
        <Routes>
          <Route path="/" element={
            <>
              <MainHero />
              <SectionBar />
              <div className="mt-4 flex flex-col items-center">
                <InfoCardsSection />
              </div>
            </>
          } />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Define más rutas según sea necesario */}
        </Routes>
        <ModalFactory
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedMediaItem={selectedMediaItem as MediaItem}
        />
      </div>
  )
}

export default App
