// /middlewares/upload.js

import multer from 'multer'

// Configura multer para almacenar archivos en memoria
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // Limita el tamaño del archivo a 5MB, ajusta según necesidad
  }
  // Aquí puedes añadir más lógica si necesitas filtrar tipos de archivo, etc.
})

export default upload
