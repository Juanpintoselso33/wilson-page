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
    <div className="m-4 flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-xl font-semibold text-gray-800">{title}</h3>
      <p className="mb-4 text-center text-gray-600">{description}</p>
      <div className="flex justify-center">
        <video className="rounded-lg shadow" width="480" controls>
          <source src={mediaFileUrl} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
    </div>
  )
}

export default InfoCard
