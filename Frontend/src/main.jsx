import React from 'react'
import ReactDOM from 'react-dom/client'
import '../src/index.css'
import App from './App.jsx'
import {Provider}  from 'react-redux'
import { store } from './components/store/index.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <App />
    </Provider>
    
  
)
