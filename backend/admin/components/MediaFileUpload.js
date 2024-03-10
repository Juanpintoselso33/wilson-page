import { Box, Button } from '@adminjs/design-system'
import { BasePropertyComponent } from 'adminjs'
import React from 'react'

const MediaFileUpload = (props) => {
  const { record, property, onChange } = props

  console.log('MediaFileUpload props:', props)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    console.log('Selected file:', file)

    const formData = new FormData()
    formData.append('file', file)

    fetch('/upload', {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Upload response:', data)
        const fileUrl = data.fileUrl
        onChange(property.name, fileUrl)
      })
      .catch((error) => {
        console.error('Error uploading file:', error)
      })
  }

  console.log('Rendering MediaFileUpload')

  return React.createElement(
    BasePropertyComponent,
    props,
    React.createElement(
      Box,
      null,
      React.createElement(
        Button,
        {
          variant: 'primary',
          onClick: () => {
            const fileInput = document.createElement('input')
            fileInput.type = 'file'
            fileInput.accept = 'image/*,video/*,audio/*'
            fileInput.addEventListener('change', handleFileUpload)
            fileInput.click()
          }
        },
        'Upload File'
      )
    )
  )
}

export default MediaFileUpload
