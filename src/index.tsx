import 'styles/index.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import App from '@/components/App'

import { MediaProvider } from './contexts/MediaContext' // Importa MediaProvider

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <MediaProvider>
      {' '}
      {/* Envuelve App con MediaProvider */}
      <App />
    </MediaProvider>
  </React.StrictMode>
)
