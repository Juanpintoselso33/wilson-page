// routes/upload.js

import express from 'express'
import multer from 'multer'

import s3 from '../config/aws.js'
import MediaFile from '../models/MediaFile.js' // Asegúrate de importar tu modelo

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post('/upload', upload.single('file'), async (req, res) => {
  const { file } = req
  const fileKey = `${Date.now()}-${file.originalname}`

  const s3Params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read'
  }

  try {
    const s3UploadResult = await s3.upload(s3Params).promise()

    const mediaFile = await MediaFile.create({
      fileUrl: s3UploadResult.Location
    })

    res.status(201).json({ fileUrl: mediaFile.fileUrl })
  } catch (error) {
    console.error('Error al cargar archivo:', error)
    res.status(500).json({ error: 'Error al cargar archivo' })
  }
})

export default router
