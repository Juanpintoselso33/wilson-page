import { MediaFile } from './mediaFile.types' // Asegúrate de ajustar la ruta de importación

export interface MediaItem {
  id: number
  name: string
  description: string
  media_file: MediaFile
  created_at: Date
  updated_at: Date
}
