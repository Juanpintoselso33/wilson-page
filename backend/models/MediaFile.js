// models/MediaFile.js
import { DataTypes } from 'sequelize'

import sequelize from '../database.js' // Asegúrate de que esta importación coincida con la configuración de tu base de datos

const MediaFile = sequelize.define('MediaFile', {
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: false
  }
  // No necesitas incluir otros campos si solo te interesa la URL
})

// No olvides exportar el modelo
export default MediaFile
