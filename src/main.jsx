import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux' // 1. Importe o Provider
import { store } from './store'       // 2. Importe a sua store do Redux
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
