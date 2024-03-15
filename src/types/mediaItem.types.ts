import { MediaFile } from './mediaFile.types' // Asegúrate de ajustar la ruta de importación
export interface MediaItem {
  id: number
  name: string
  description: string
  media_file: number // Adjusted from mediaFileId to match the backend response
  created_at: Date
  updated_at: Date
  mediaFile?: MediaFile // This remains for the fetched media file object
  category: string // Add this line
  mediaFileUrls?: string[] // Added to resolve the error
  thumbnailUrl?: string // Added to resolve the error
}
