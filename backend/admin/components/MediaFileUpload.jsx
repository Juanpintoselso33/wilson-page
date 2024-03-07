import { BasePropertyComponent } from 'adminjs'
import React, { useRef, useState } from 'react'

const MediaFileUpload = (props) => {
  const { property, onChange } = props
  const [file, setFile] = useState(null)
  const fileInputRef = useRef()

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleUploadClick = () => {
    fileInputRef.current.click() // Abre el diálogo de selección de archivos
  }

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/admin/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (response.ok) {
        onChange(property.name, data.fileUrl)
        alert('File uploaded successfully.')
      } else {
        throw new Error(data.error || 'Upload failed')
      }
    } catch (error) {
      alert(error.message || 'An error occurred during the upload.')
    }
  }

  return (
    <BasePropertyComponent {...props}>
      <div>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <button type="button" onClick={handleUploadClick}>
          Select File
        </button>
        {file && (
          <button type="button" onClick={handleUpload}>
            Upload
          </button>
        )}
      </div>
      {file && <p>Selected file: {file.name}</p>}
    </BasePropertyComponent>
  )
}

export default MediaFileUpload
