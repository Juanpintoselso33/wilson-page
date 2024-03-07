// Importa los iconos que vas a utilizar
import {
  BookOpenIcon,
  BriefcaseIcon,
  HomeIcon,
  PhotoIcon,
  UserGroupIcon
} from '@heroicons/react/24/solid'
import React, { useState } from 'react'

import SectionButton from './SectionButton' // Asegúrate de que la ruta de importación sea correcta

const SectionBar = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const icons = [
    { svg: <HomeIcon className="h-6 w-6" />, label: 'Home' },
    { svg: <UserGroupIcon className="h-6 w-6" />, label: 'Community' },
    { svg: <BookOpenIcon className="h-6 w-6" />, label: 'Library' },
    { svg: <BriefcaseIcon className="h-6 w-6" />, label: 'Jobs' },
    { svg: <PhotoIcon className="h-6 w-6" />, label: 'Gallery' }
  ]

  return (
    <div className="flex items-center justify-around bg-white text-cyan-400 shadow-md">
      {icons.map((icon, index) => (
        <SectionButton
          key={index}
          icon={icon.svg}
          label={icon.label}
          isActive={index === activeIndex}
          onClick={() => setActiveIndex(index)}
        />
      ))}
    </div>
  )
}

export default SectionBar
