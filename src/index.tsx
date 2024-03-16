import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa BrowserRouter
import App from './components/App'; // Asegúrate de que la ruta de importación sea correcta
import { MediaProvider } from './contexts/MediaContext';
import 'styles/index.css';

const container = document.getElementById('root');
const root = createRoot(container!); // Asegúrate de que container no sea null

root.render(
  <React.StrictMode>
    <Router> {/* Envuelve todo en Router */}
      <MediaProvider>
        <App />
      </MediaProvider>
    </Router>
  </React.StrictMode>
);
