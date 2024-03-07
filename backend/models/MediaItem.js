// models/MediaItem.js
import { DataTypes } from 'sequelize'

import sequelize from '../database.js' // Asegúrate de tener tu instancia de sequelize configurada
import MediaFile from './MediaFile.js' // Importa el modelo MediaFile

const MediaItem = sequelize.define('MediaItem', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  uploadDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  historicalYear: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fileType: {
    type: DataTypes.ENUM('video', 'audio', 'image'),
    allowNull: false
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Ideas adicionales:
  // Tags para facilitar la búsqueda y organización
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  // Duración del archivo si es relevante (por ejemplo, para vídeos o audio)
  duration: {
    type: DataTypes.INTEGER, // Duración en segundos
    allowNull: true
  },
  // El tamaño del archivo puede ser útil para cálculos de rendimiento
  fileSize: {
    type: DataTypes.INTEGER, // Tamaño en bytes
    allowNull: true
  },
  // Miniatura para imágenes y vídeos
  thumbnailUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
})
// Establecer la relación
MediaItem.hasOne(MediaFile, {
  foreignKey: 'mediaItemId',
  as: 'mediaFile' // Opcional: define un alias para cuando incluyas MediaFile en las consultas de MediaItem
})
MediaFile.belongsTo(MediaItem, {
  foreignKey: 'mediaItemId'
})

export { MediaFile, MediaItem }
