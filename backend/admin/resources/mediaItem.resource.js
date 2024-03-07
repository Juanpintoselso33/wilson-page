// admin/resources/mediaItem.resource.js

import AdminJS from 'adminjs'

// Importa el modelo Sequelize para MediaItem
import { MediaItem } from '../../models/MediaItem.js'

export default {
  resource: MediaItem,
  options: {
    properties: {
      title: {
        isTitle: true,
        type: 'string'
      },
      description: {
        type: 'textarea'
      },
      uploadDate: {
        isVisible: { list: true, edit: false, filter: true, show: true }
      },
      historicalYear: {
        type: 'number',
        isVisible: { list: true, edit: true, filter: true, show: true }
      },
      fileType: {
        isVisible: { list: true, edit: true, filter: true, show: true }
      },
      fileUrl: {
        isVisible: { list: false, edit: true, filter: false, show: true }
      },
      tags: {
        type: 'string',
        isVisible: { list: true, edit: true, filter: true, show: true }
      },
      duration: {
        type: 'number',
        isVisible: { list: true, edit: true, filter: true, show: true }
      },
      fileSize: {
        type: 'number',
        isVisible: { list: true, edit: true, filter: true, show: true }
      },
      thumbnailUrl: {
        isVisible: { list: true, edit: true, filter: false, show: true }
      }
    },
    // Define las propiedades que quieres mostrar en la vista de lista, editar, etc.
    listProperties: [
      'thumbnailUrl',
      'title',
      'fileType',
      'historicalYear',
      'uploadDate'
    ],
    editProperties: [
      'title',
      'description',
      'historicalYear',
      'fileType',
      'tags',
      'duration',
      'fileSize',
      'thumbnailUrl',
      'fileUrl'
    ],
    showProperties: [
      'title',
      'description',
      'historicalYear',
      'fileType',
      'uploadDate',
      'tags',
      'duration',
      'fileSize',
      'thumbnailUrl',
      'fileUrl'
    ],
    filterProperties: ['title', 'historicalYear', 'fileType', 'tags']
    // Aquí puedes añadir acciones personalizadas si es necesario
  }
  // Aún puedes añadir acciones personalizadas aquí si las necesitas
}
