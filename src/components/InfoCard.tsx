import React from 'react'

interface InfoCardProps {
  title: string
  description: string
  /* Puedes agregar más props según necesites, por ejemplo:
  imageUrl: string;
  audioUrl: string;
  videoUrl: string;
  */
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description }) => {
  return (
    <div className="m-2 rounded bg-white p-4 shadow-md">
      <h3 className="mb-2 text-lg font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
      {/* Acá podrías agregar una imagen, reproductor de audio o video si es necesario */}
    </div>
  )
}

export default InfoCard
