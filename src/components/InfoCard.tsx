import React, { useState } from 'react'

import InfoCardDetailModal from './InfoCardDetailModal'

// Componentes locales simplificados
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <div className={`rounded-lg bg-white shadow ${className}`}>{children}</div>
)

const CardContent: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  // Replace "card-content" with Tailwind utility classes
  <div className={`rounded-lg bg-white p-4 shadow ${className}`}>
    {children}
  </div>
)

interface InfoCardProps {
  title: string
  description: string
  mediaFileUrls: string[]
  thumbnailUrl?: string // Optional thumbnail URL for videos
  category: string // Add category to the props
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  mediaFileUrls,
  thumbnailUrl,
  category
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  let displayUrl = mediaFileUrls[0] // Default display URL

  console.log('category', category)
  console.log('thumbnailUrl', thumbnailUrl)
  console.log('mediaFileUrls', mediaFileUrls)

  if (category === 'video' && thumbnailUrl) {
    displayUrl = thumbnailUrl // Use thumbnailUrl for videos
  }

  // Add more conditions for other categories if needed

  return (
    <Card className="w-full max-w-lg border-2 border-cyan-300 bg-white text-cyan-700 shadow-md transition-transform hover:scale-105 dark:border-2 dark:border-gray-700 dark:bg-gray-900">
      <CardContent className="w-full space-y-6">
        <div className="flex w-full justify-center">
          <img
            alt="Media Thumbnail"
            className="rounded-lg object-cover"
            height={200}
            src={displayUrl} // Use displayUrl here
            style={{ aspectRatio: '400/200', objectFit: 'cover' }}
            width={400}
          />
        </div>
        <div className="grid w-full grid-cols-2 gap-4">
          <div className="text-sm font-medium text-gray-500">Title</div>
          <div className="text-sm font-medium">{title}</div>
          <div className="text-sm font-medium text-gray-500">Description</div>
          <div className="text-sm font-medium">{description}</div>
          {/* Ajusta según los datos que tengas disponibles */}
        </div>
        <div className="flex w-full justify-center">
          <button
            className="mt-4 inline-block rounded-lg border-2 border-cyan-400 bg-cyan-200 px-4 py-2 text-cyan-700 transition-all hover:bg-cyan-300 hover:text-cyan-800 dark:border-gray-700 dark:bg-cyan-400 dark:text-white"
            onClick={() => setIsModalOpen(true)}
          >
            View Details
          </button>
        </div>
      </CardContent>
      <InfoCardDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={description}
        mediaFileUrl={displayUrl} // Use displayUrl here
      />
    </Card>
  )
}

export default InfoCard
