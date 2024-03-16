import React, { useContext } from 'react'

import { MediaContext } from '../contexts/MediaContext'
import InfoCard from './InfoCard'

const InfoCardsSection = () => {
  const { mediaItems, currentFilter } = useContext(MediaContext)

  const filteredMediaItems = mediaItems.filter((item) => {
    return currentFilter === 'all' || item.category === currentFilter
  })

  return (
    <section className="p-4">
      <div className="grid grid-cols-1 items-stretch gap-12 md:grid-cols-3">
        {filteredMediaItems.map((item) => (
          <InfoCard
            key={item.id}
            name={item.name}
            description={item.description}
            category={item.category}
            creator={item.creator}
            previewUrl={item.previewUrl}
            status={item.status}
            publishDate={item.publishDate}
            mediaFiles={item.mediaFiles}
            created_at={item.created_at}
            updated_at={item.updated_at}
            tags={item.tags}
            // Pasa aquí cualquier otra propiedad relevante
          />
        ))}
      </div>
    </section>
  )
}

export default InfoCardsSection
