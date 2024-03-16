import { MediaItem } from '../types/mediaItem.types'

const API_URL = 'http://127.0.0.1:8000/api/media-items/'

const fetchMediaItems = async (): Promise<MediaItem[]> => {
  try {
    const response = await fetch(`${API_URL}`) // Asegúrate de que la URL sea correcta
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()

    // Decode the URLs of media files
    const decodedData = data
      .map((item) => ({
        ...item,
        mediaFiles: item.media_files
          ? item.media_files.map((file) => ({
              ...file,
              file: decodeURIComponent(
                decodeURIComponent(file.file.replace(/^\//, ''))
              )
            }))
          : [] // Handle undefined mediaFiles by defaulting to an empty array
      }))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ media_files, ...rest }) => rest)

    console.log('Media items:', decodedData)
    return decodedData
  } catch (error) {
    console.error('Error fetching media items:', error)
    throw error // Propagar el error para manejarlo en el componente
  }
}

export { fetchMediaItems }
