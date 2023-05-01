import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import LoginForm from './components/loginForm'
import SignUp from './components/signUp'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/signUp" element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App