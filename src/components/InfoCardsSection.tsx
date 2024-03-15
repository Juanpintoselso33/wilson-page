import React, { useContext, useEffect, useState } from 'react'

import { fetchMediaFileById } from '../api/mediaFile'
import { fetchMediaItems } from '../api/mediaService'
import { MediaContext } from '../contexts/MediaContext'
import { MediaItem } from '../types/mediaItem.types'
import InfoCard from './InfoCard'

const InfoCardsSection = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  console.log('Media Items:', mediaItems)
  console.log(
    'Media Items Categories:',
    mediaItems.map((item) => item.category)
  )
  const { currentFilter } = useContext(MediaContext)

  const filteredMediaItems = mediaItems.filter((item) => {
    console.log('Filtro:', currentFilter)
    return currentFilter === 'all' || item.category === currentFilter
  })

  console.log('Filtered items:', filteredMediaItems)

  useEffect(() => {
    const loadMediaItems = async () => {
      try {
        const mediaItemsData = await fetchMediaItems()
        console.log('Media Items:', mediaItemsData) // Added console.log to log media items from the backend
        const mediaItemsWithFiles = await Promise.all(
          mediaItemsData.map(async (item) => {
            if (item.media_files.length > 0) {
              const mediaFiles = await Promise.all(
                item.media_files.map((file) => fetchMediaFileById(file.id))
              )
              const mediaFileUrls = mediaFiles.map((mediaFile) => {
                return decodeURIComponent(mediaFile.file).replace(/^\//, '')
              })
              // Directly use mediaFile.file without decoding or URL manipulation
              return {
                ...item,
                mediaFileUrls: mediaFileUrls,
                thumbnailUrl: mediaFiles[0]?.thumbnail || 'defaultThumbnailUrl'
              }
            }
            return item // Return item as is if no media files are associated
          })
        )
        setMediaItems(mediaItemsWithFiles)
      } catch (error) {}
    }

    loadMediaItems()
  }, [])

  return (
    <section className="p-4">
      <div className="grid grid-cols-1 items-stretch gap-12 md:grid-cols-3">
        {filteredMediaItems.map((item) => (
          <InfoCard
            key={item.id}
            title={item.name}
            description={item.description}
            mediaFileUrls={item.mediaFileUrls || ['defaultFileUrl']}
            thumbnailUrl={item.thumbnailUrl || 'defaultThumbnailUrl'}
            category={item.category}
            mediaFiles={item.mediaFileUrls || ['defaultFileUrl']} // Add this line if mediaFiles is the same as mediaFileUrls
          />
        ))}
      </div>
    </section>
  )
}

export default InfoCardsSection
