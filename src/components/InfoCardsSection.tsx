import React, { useEffect, useState } from 'react'

import { fetchMediaFileById } from '../api/mediaFile'
import { fetchMediaItems } from '../api/mediaService'
import { MediaItem } from '../types/mediaItem.types'
import InfoCard from './InfoCard'

const InfoCardsSection = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])

  useEffect(() => {
    const loadMediaItems = async () => {
      try {
        console.log('Fetching media items...')
        const mediaItemsData = await fetchMediaItems()
        console.log('Media items fetched:', mediaItemsData)
        const mediaItemsWithFiles = await Promise.all(
          mediaItemsData
            .filter((item) => item.media_file !== undefined) // Use the correct property name here
            .map(async (item) => {
              console.log('Fetching media file for item:', item)
              const mediaFile = await fetchMediaFileById(item.media_file) // And here
              console.log('Fetched media file:', mediaFile)
              return { ...item, mediaFile }
            })
        )
        console.log('Media items with files:', mediaItemsWithFiles)
        setMediaItems(mediaItemsWithFiles)
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
            mediaFileUrl={item.mediaFile?.file || 'defaultFileUrl'}
          />
        ))}
      </div>
    </section>
  )
}

export default InfoCardsSection
