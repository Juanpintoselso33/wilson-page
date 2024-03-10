import React, { useEffect, useState } from 'react'

import { fetchMediaItems } from '../api/mediaService' // Asegúrate de que esta función esté implementada correctamente
import { MediaItem } from '../types/mediaItem.types' // Asegúrate de que la ruta de importación sea correcta
import InfoCard from './InfoCard'

const InfoCardsSection = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])

  useEffect(() => {
    const loadMediaItems = async () => {
      try {
        const data = await fetchMediaItems()
        setMediaItems(data)
      } catch (error) {
        console.error('Failed to fetch media items:', error)
      }
    }

    loadMediaItems()
  }, [])

  return (
    <section className="p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {mediaItems.map((item) => (
          <InfoCard
            key={item.id}
            title={item.name}
            description={item.description}
            mediaFileUrl={item.media_file?.file || 'defaultFileUrl'} // Ajusta según la estructura de tus datos
          />
        ))}
      </div>
    </section>
  )
}

export default InfoCardsSection
