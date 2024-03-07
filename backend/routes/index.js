// /routes/index.js

import express from 'express'

import uploadRoutes from './upload.js'

const router = express.Router()

router.use('/upload', uploadRoutes)

// ... otras rutas ...

export default router
