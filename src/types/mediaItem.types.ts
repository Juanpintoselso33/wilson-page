// src/types/mediaItem.types.ts
import { MediaFile } from './mediaFile.types'

export interface MediaItem {
  id: number
  name: string
  description: string
  category: string // Nuevo campo
  creator: string // Nuevo campo
  previewUrl?: string // Nuevo campo, opcional
  status: string // Nuevo campo
  publishDate?: string // Nuevo campo, opcional
  mediaFiles: MediaFile[] // Relación ManyToMany con MediaFile
  created_at: string
  updated_at: string
  tags: string[] // Representación simplificada de TaggableManager, ajusta según necesidades
}
