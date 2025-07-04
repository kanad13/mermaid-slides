import React from 'react'
import ReactDOM from 'react-dom/client'
import ExtensionApp from './ExtensionApp.tsx'
import './styles/index.css'

// Extension-specific entry point that creates its own root element
function initializeExtensionApp() {
  // Create root element if it doesn't exist
  let rootElement = document.getElementById('mermaid-slides-root')
  if (!rootElement) {
    rootElement = document.createElement('div')
    rootElement.id = 'mermaid-slides-root'
    rootElement.style.width = '100%'
    rootElement.style.height = '100vh'
    rootElement.style.overflow = 'hidden'
    document.body.appendChild(rootElement)
  }

  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <ExtensionApp />
    </React.StrictMode>
  )
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeExtensionApp)
} else {
  initializeExtensionApp()
}

// Export for external use
export { initializeExtensionApp }