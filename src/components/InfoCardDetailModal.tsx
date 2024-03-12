import React from 'react'

interface InfoCardDetailModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  mediaFileUrl: string
}

const InfoCardDetailModal: React.FC<InfoCardDetailModalProps> = ({
  isOpen,
  onClose,
  title,
  description
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="rounded-lg bg-white p-4">
        <h2>{title}</h2>
        <p>{description}</p>
        <button
          onClick={onClose}
          className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default InfoCardDetailModal
