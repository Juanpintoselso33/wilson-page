import React from 'react'

import InfoCard from './InfoCard'

const InfoCardsSection = () => {
  const placeholderData = [
    {
      title: 'Card 1',
      description: 'This is a placeholder description for card 1.'
    },
    {
      title: 'Card 2',
      description: 'This is a placeholder description for card 2.'
    },
    {
      title: 'Card 3',
      description: 'This is a placeholder description for card 3.'
    }
    // Agrega más objetos con datos de placeholder según necesites
  ]

  return (
    <section className="p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {placeholderData.map((data, index) => (
          <InfoCard
            key={index}
            title={data.title}
            description={data.description}
            // Pasa más props si las agregaste en InfoCardProps
          />
        ))}
      </div>
    </section>
  )
}

export default InfoCardsSection
