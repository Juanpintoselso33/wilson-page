import AdminJSSequelize from '@adminjs/sequelize'
import AdminJS from 'adminjs'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import adminRouter from './admin.router.js' // Rutas de AdminJS
import adminConfig from './admin/admin.config.js' // Configuración de AdminJS
import sequelize from './database.js'
import routes from './routes/index.js' // Tus rutas personalizadas

AdminJS.registerAdapter(AdminJSSequelize)
const app = express()
const port = process.env.PORT || 3000

// Calcular __dirname en módulos ES6
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Sirviendo archivos estáticos de la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')))

// Montar las rutas de AdminJS con el rootPath correcto
app.use(adminConfig)
app.use(adminRouter)

sequelize
  .sync()
  .then(() => {
    console.log('Tablas sincronizadas con éxito.')
  })
  .catch((error) => {
    console.error('Hubo un error al sincronizar las tablas:', error)
  })

// Rutas personalizadas
app.use('/', routes)

// Ruta para la página de carga de archivos
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'upload.html'))
})

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
