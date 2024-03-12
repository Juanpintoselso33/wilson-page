// Asume que baseURL es la URL base de tu API
import { MediaFile } from '../types/mediaFile.types'

const baseURL = 'http://127.0.0.1:8000/api' // Ajusta esto a tu configuración

async function fetchMediaFileById(mediaFileId: number): Promise<MediaFile> {
  const response = await fetch(`${baseURL}/media-files/${mediaFileId}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      // Include any authentication headers if necessary
    }
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await response.json()
  // Check if the file URL starts with 'https://' or 'http://', prepend 'https://' if not
  const fileUrl = data.file
  const thumbnailUrl = data.thumbnail // Add this line to capture the thumbnail URL
  return {
    id: data.id,
    filename: data.filename,
    file: fileUrl,
    thumbnail: thumbnailUrl, // Add this line to include the thumbnail in the returned object
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at)
  }
}

export { fetchMediaFileById }
