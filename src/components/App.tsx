// src/components/App.tsx
import React from 'react'

import InfoCardsSection from './InfoCardsSection'
import MainHero from './MainHero' // Asegúrate de que la ruta de importación sea correcta
import NavBar from './NavBar' // Importa el componente NavBar
import SectionBar from './SectionBar'

const App = () => {
  return (
    <div className="flex flex-col justify-center bg-gray-300">
      <NavBar /> {/* Inclusión del componente NavBar */}
      <MainHero /> {/* Inclusión del componente MainHero */}
      <SectionBar /> {/* Inclusión del componente SectionBar */}
      <InfoCardsSection /> {/* Inclusión del componente InfoCardsSection */}
    </div>
  )
}

export default App