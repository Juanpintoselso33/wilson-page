import React from 'react'

interface InfoCardProps {
  title: string
  description: string
  mediaFileUrl: string // URL del archivo media
  // Agrega cualquier otra prop que necesites
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  mediaFileUrl
}) => {
  return (
    <div className="m-2 rounded bg-white p-4 shadow-md">
      <h3 className="mb-2 text-lg font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
      {/* Ejemplo de cómo mostrar la URL del archivo media */}
      <div>
        <a href={mediaFileUrl} target="_blank" rel="noopener noreferrer">
          Ver archivo
        </a>
      </div>
    </div>
  )
}

export default InfoCard
