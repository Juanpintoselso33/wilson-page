import React, { useEffect, useState } from 'react'

import config from '../config/index.json'

const MainHero: React.FC = () => {
  const { mainHeroImage, title, description } = config.mainHero
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 100) // Inicia la animación poco después de montar el componente
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`flex h-128 w-full overflow-hidden bg-gradient-to-b from-cyan-400 to-cyan-900 text-white ${
        loaded ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-3000 ease-in-out`}
    >
      <div className="relative w-2/3">
        <img
          src={mainHeroImage}
          alt="Descripción de la imagen"
          className={`absolute bottom-0 right-0 h-5/6 w-5/6 object-cover transition-transform duration-1000 ease-out ${
            loaded ? 'translate-x-0' : '-translate-x-2/3'
          }`} // La imagen comienza desde -2/3 del ancho del div para que aparezca desde la izquierda
          onLoad={() => setLoaded(true)}
        />
      </div>
      <div className="flex w-1/2 flex-col justify-center p-8">
        <h1 className="text-5xl font-bold">{title}</h1>
        <p className="mt-4 text-xl">{description}</p>
      </div>
    </div>
  )
}

export default MainHero
