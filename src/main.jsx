import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SesionProvider } from './context/SesionContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SesionProvider>
      <App />
    </SesionProvider>
  </React.StrictMode>
)
