import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateForm from './components/CreateForm'
import Home from './components/Home'
import Profile from './components/Profile/profile'
import UpdateProf from './components/Profile/updateProf'
import UpdateForm from './components/UpdateForm'
import CurrentUsers from './components/Users/currentUsers'
import DeleteAcc from './components/deleteAcc'
import AdminFeedback from './components/feedback/feeedback'
import LoginForm from './components/loginForm'
import NewComplaints from './components/newComplaints'
import SignUp from './components/signUp'
import Users from './components/users'
import Header from './header'
import { default as AddFeedback, default as Feedback } from "./pages/Addfeedback"
import Complaints from './pages/Complaints'
import CurrentComplaints from './pages/CurrentComplaints'
import ComplaintStatus from './pages/complaintStatus'
import DisplayFeeds from './pages/displayFeeds'
import EmailVerify from './pages/emailVerify'

import { useSelector } from 'react-redux'
import "./App.css"
import { AuthProvider } from './components/AuthContext'

import Footer from './Footer'

const App = () => {

  const isLogged = useSelector((state) => state.isLogged)

  console.log(isLogged)
  return (

    <BrowserRouter>

      <Header />
      <Routes>

        <Route path="/login" element={<LoginForm />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/displayFeeds/:id" element={<DisplayFeeds />} />
        <Route path='/verifyEmail' element={<EmailVerify />} />
        <Route path="/feed" element={<AdminFeedback />} />
        <Route path="/" element={<Home />} />
        {isLogged && <Route path="/newUsers" element={<Users />} />}
        {isLogged && <Route path="/profile" element={<Profile />} />}
        {isLogged && <Route path="/currentUsers" element={<CurrentUsers />} />}
        {isLogged && <Route path="/updateProfile/:id" element={<UpdateProf />} />}
        {isLogged && <Route path="/deleteProfile" element={<DeleteAcc />} />}
        {isLogged && <Route path="/addFeedBack/:id" element={<AddFeedback />} />}
        {isLogged && <Route path="/complain" element={<Complaints />} />}
        {isLogged && <Route path="/create-complaint" element={<CreateForm />} />}
        {isLogged && <Route path="/newComplaints" element={<NewComplaints />} />}
        {isLogged && <Route path="/current_Complaints" element={<CurrentComplaints />} />}
        {isLogged && <Route path="/complaint_Status/:id" element={<ComplaintStatus />} />}
        {isLogged && <Route path="/updateComplaint/:id" element={<UpdateForm />} />}
        <Route path="*" element={<h1><center>Page Not Found</center></h1>} />

      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;