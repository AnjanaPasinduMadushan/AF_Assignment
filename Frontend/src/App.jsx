import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import LoginForm from './components/loginForm'
import SignUp from './components/signUp'
import Users from './components/users'
import Header from './header'
import Profile from './components/Profile/profile'
import CurrentUsers from './components/Users/currentUsers'
import UpdateProf from './components/Profile/updateProf'
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
        {isLogged &&<Route path="/profile" element={<Profile/>} />}
        {isLogged &&<Route path="/currentUsers" element={<CurrentUsers/>} />}
        {isLogged &&<Route path="/updateProfile/:id" element={<UpdateProf/>} />}
      </Routes>
    </BrowserRouter>
    
  )
}

export default App