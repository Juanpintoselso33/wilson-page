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
          mediaItemsData.map(async (item) => {
            if (item.media_files.length > 0) {
              console.log('Fetching media file for item:', item)
              const mediaFile = await fetchMediaFileById(item.media_files[0].id) // Adjusted to fetch the first media file
              console.log('Fetched media file:', mediaFile)
              console.log('Fetched media file with thumbnail:', mediaFile) // Added to debug thumbnailUrl undefined issue
              // Assuming `mediaFile` is the object you received from the backend
              mediaFile.file = decodeURIComponent(mediaFile.file).replace(
                /^\//,
                ''
              )
              // Directly use mediaFile.file without decoding or URL manipulation
              return { ...item, mediaFile: mediaFile }
            }
            return item // Return item as is if no media files are associated
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
            mediaFileUrls={[item.mediaFile?.file || 'defaultFileUrl']}
            thumbnailUrl={item.mediaFile?.thumbnail || 'defaultThumbnailUrl'}
            category={item.category} // Pass the category prop
          />
        ))}
      </div>
    </section>
  )
}

export default InfoCardsSection
