// admin/resources/mediaFile.resource.js
import AdminJS from 'adminjs'
import path from 'path'
import { fileURLToPath } from 'url'

import MediaFile from '../../models/MediaFile.js'

// Convertir import.meta.url a una ruta de archivo y luego obtener el directorio
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Registra el componente de carga personalizado para su uso en la interfaz de AdminJS
AdminJS.registerComponent({
  name: 'MediaFileUpload',
  component: AdminJS.bundle(
    path.join(__dirname, '../components/MediaFileUpload.jsx')
  )
})

export default {
  resource: MediaFile,
  options: {
    properties: {
      fileUrl: {
        type: 'string',
        isVisible: { list: true, edit: true, filter: false, show: true },
        components: {
          edit: 'MediaFileUpload' // Nombre del componente registrado
        }
      }
      // Aquí puedes añadir más configuraciones para otras propiedades de tu modelo MediaFile
    },
    actions: {
      new: {
        before: async (request, context) => {
          // Manipulación de la solicitud antes de crear un nuevo registro de MediaFile
          return request
        },
        after: async (response, request, context) => {
          // Manipulación de la respuesta después de crear un nuevo registro de MediaFile
          return response
        }
      }
      // Aquí puedes configurar otras acciones como edit, delete, etc., si es necesario
    }
    // Aquí puedes añadir otras opciones de configuración para este recurso
  }
  // Aquí puedes añadir configuraciones adicionales como listProperties, editProperties, etc.
}
