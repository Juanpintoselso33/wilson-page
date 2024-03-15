import React, { ReactNode } from 'react'

interface SectionButtonProps {
  icon: ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}

const SectionButton: React.FC<SectionButtonProps> = ({
  icon,
  label,
  isActive,
  onClick
}) => {
  return (
    <button
      className={`flex w-full flex-col items-center justify-center p-2 focus:outline-none ${
        isActive ? 'text-cyan-600' : 'text-cyan-800'
      }`}
      onClick={onClick}
    >
      <div className="mb-1">{icon}</div>
      <div className="text-xs">{label}</div>
      {isActive && <div className="h-1 w-full rounded-t-md bg-cyan-600"></div>}
    </button>
  )
}

export default SectionButton
