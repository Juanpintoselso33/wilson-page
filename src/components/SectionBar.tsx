// Importa los iconos que vas a utilizar
import {
  CameraIcon, // Import the correct icon for photos
  HomeIcon,
  MusicalNoteIcon, // Import the correct icon for audio
  VideoCameraIcon // Import the correct icon for video
} from '@heroicons/react/24/solid'
import React, { useContext, useState } from 'react'

import { MediaContext } from '../contexts/MediaContext'
import SectionButton from './SectionButton' // Asegúrate de que la ruta de importación sea correcta

const SectionBar = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { setCurrentFilter } = useContext(MediaContext)

  const handleSectionClick = (category: string, index: number) => {
    setActiveIndex(index)
    setCurrentFilter(category)
  }

  const icons = [
    {
      svg: <HomeIcon className="h-6 w-6" />,
      label: 'Inicio',
      category: 'all'
    },
    {
      svg: <VideoCameraIcon className="h-6 w-6" />,
      label: 'Videos',
      category: 'video'
    },
    {
      svg: <CameraIcon className="h-6 w-6" />,
      label: 'Fotos',
      category: 'fotos'
    },
    {
      svg: <MusicalNoteIcon className="h-6 w-6" />,
      label: 'Audio',
      category: 'audio'
    }
  ]

  return (
    <div className="flex items-center justify-around bg-white text-cyan-400 shadow-md ">
      {icons.map((icon, index) => (
        <SectionButton
          key={index}
          icon={icon.svg}
          label={icon.label}
          onClick={() => handleSectionClick(icon.category, index)}
          isActive={index === activeIndex}
        />
      ))}
    </div>
  )
}

export default SectionBar
