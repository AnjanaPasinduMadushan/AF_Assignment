import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import LoginForm from './components/loginForm'
import SignUp from './components/signUp'
import Users from './components/users'
import Header from './header'
import { useSelector } from 'react-redux'

const App = () => {

  const isLogged = useSelector((state)=>state.isLogged)

  console.log(isLogged)
  return (
    <BrowserRouter>

    <Header/>
      <Routes>
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/signUp" element={<SignUp/>} />
        {isLogged &&<Route path="/newUsers" element={<Users/>} />}
      </Routes>
    </BrowserRouter>
    
  )
}

export default App