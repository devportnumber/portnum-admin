import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// style
import GlobalStyle from './styles/globalStyle'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <>
    <GlobalStyle />
    <App />
  </>,
  // </React.StrictMode>,
)
