import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Complaints from './pages/Complaints'
import LoginForm from './components/loginForm'
import SignUp from './components/signUp'
import Users from './components/users'
import Header from './header'
import Profile from './components/Profile/profile'
import CurrentUsers from './components/Users/currentUsers'
import UpdateProf from './components/Profile/updateProf'
import ForgetPwd from './components/forgetPwd'
import ResetPwd from './components/resetPwd'
import Feedback from "./pages/Addfeedback";
import AddFeedback from './pages/Addfeedback';
import DisplayFeeds from './pages/displayFeeds';
import CreateForm from './components/CreateForm'
import NewComplaints from './components/newComplaints'
import CurrentComplaints from './pages/CurrentComplaints'
import ComplaintStatus from './pages/complaintStatus'
import { AuthProvider } from './components/AuthContext'
import { useSelector } from 'react-redux'
import "./App.css";

const App = () => {

  const isLogged = useSelector((state) => state.isLogged)

  console.log(isLogged)
  return (
    
    <BrowserRouter>

      <Header />
      <Routes>
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/signUp" element={<SignUp/>} />
        {isLogged &&<Route path="/newUsers" element={<Users/>} />}
        {isLogged &&<Route path="/profile" element={<Profile/>} />}
        {isLogged &&<Route path="/currentUsers" element={<CurrentUsers/>} />}
        {isLogged &&<Route path="/updateProfile/:id" element={<UpdateProf/>} />}
        {isLogged &&<Route path="/addFeedBack/:id" element={<AddFeedback/>} />}
        <Route path="/forgetPassword" element={<ForgetPwd/>} />
        <Route path="/reset-pwd/:token" element={<ResetPwd/>} />
        {/* {isLogged && <Route path="/" element={<Complaints />} />} */}
          <Route path="/feedback" element={<Feedback/>}/>
          <Route path="/displayFeeds/:id" element={<DisplayFeeds/>}/>
          {isLogged &&<Route path="/" element={<Complaints />} /> }
          {isLogged &&<Route path="/create-complaint" element={<CreateForm />} />}
          {isLogged &&<Route path="/newComplaints" element={<NewComplaints />} />}
          {isLogged &&<Route path="/current_Complaints" element={<CurrentComplaints />} />}
          {isLogged &&<Route path="/complaint_Status/:id" element={<ComplaintStatus />} />}
      </Routes>
    </BrowserRouter>
    

    
      
   
  )
}

export default App
// import { useState, useEffect } from "react";
// // import { useHistory } from "react-router-dom";
// // import axios from "axios";
// import complaintsStore from "./stores/complaintsStore";
// import Complaints from "./components/Complaints";
// import UpdateForm from "./components/UpdateForm";
// import CreateForm from "./components/CreateForm";
// import Upload from "./components/Upload";
// import Navbar from "./components/Navbar";
// // import Upload from "./Upload";

// function App() {


//   const store = complaintsStore();

//   // Use effect
//   useEffect(() => {
//     store.fetchComplaints();
//   }, []);



//   const history = useState();

 
//   return (
//     <div className="App">



//       <CreateForm />
//       <Upload/>
//       <Complaints />
//       <UpdateForm />
      // <CreateForm   uploadComponent={<Upload />}/>
      
      // <Complaints />
      // <UpdateForm />
     
    
    

    
//     </div>
//   );
// }

// export default App;
