// Asume que baseURL es la URL base de tu API
import { MediaFile } from '../types/mediaFile.types'

const baseURL = 'http://127.0.0.1:8000/api' // Ajusta esto a tu configuración

async function fetchMediaFileById(mediaFileId: number): Promise<MediaFile> {
  const response = await fetch(`${baseURL}/media/${mediaFileId}/`, {
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
  return {
    id: data.id,
    filename: data.filename,
    file: data.file,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at)
  }
}

export { fetchMediaFileById }
