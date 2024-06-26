import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ContextProvider } from './context/globalContext'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ContextProvider>
          <App />
        </ContextProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
)