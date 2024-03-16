// src/types/mediaFile.types.ts

export type MediaFile = BaseMediaFile | VideoFile | AudioFile | ImageFile

export interface BaseMediaFile {
  id: number
  filename: string
  file: string // URL del archivo
  createdAt: string
  updatedAt: string
}

export interface VideoFile extends BaseMediaFile {
  duration: string // Duración como string ISO 8601
  thumbnail: string
  resolution: string // Nuevo campo
  format: string // Nuevo campo
  subtitlesUrl?: string // Nuevo campo, opcional
}

export interface AudioFile extends BaseMediaFile {
  duration: string // Duración como string ISO 8601
  bitrate: number
  format: string // Nuevo campo
}

export interface ImageFile extends BaseMediaFile {
  width: number
  height: number
  format: string // Nuevo campo
}
