// src/admin/admin.config.js
import AdminJSSequelize from '@adminjs/sequelize'
import AdminJS from 'adminjs'

import sequelize from '../database.js' // Asegúrate de que la ruta sea correcta
import mediaFileResource from './resources/mediafile.resource.js' // Asegúrate de que la ruta sea correcta
import mediaItemResource from './resources/mediaItem.resource.js' // Asegúrate de que la ruta sea correcta

// Configurando AdminJS para usar Sequelize
AdminJS.registerAdapter(AdminJSSequelize)

const adminJsOptions = {
  databases: [sequelize],
  rootPath: '/admin',
  resources: [
    {
      resource: mediaItemResource.resource,
      options: mediaItemResource.options
    },
    {
      resource: mediaFileResource.resource,
      options: mediaFileResource.options
    }
  ]
  // Omitir configuración relacionada si ya no usas AdminJS.bundle
}

export default adminJsOptions
