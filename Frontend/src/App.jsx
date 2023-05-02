import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import LoginForm from './components/loginForm'
import SignUp from './components/signUp'
import Users from './components/users'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/newUsers" element={<Users/>} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App