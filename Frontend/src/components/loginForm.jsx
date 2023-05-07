import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { autheticationActions } from './store'
import { useNavigate, Link } from 'react-router-dom'
import '../assets/forms.css'
const LoginForm = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  const [inputs, setInputs] = useState({
    email:"",
    password:""
  })

  const handleChange = (e) =>{
    setInputs((previousState)=>({
      ...previousState,
      [e.target.name] : e.target.value
    }))
  }

  const sendData = async()=>{
   
    try{
      const res = await axios.post("http://localhost:8070/User/login", {
        email:inputs.email,
        password:inputs.password
      })
      if (res && res.data) {
        const data = await res.data;
        console.log(data)
        return data;
      }else {
        throw new Error("Response data is undefined");
      }
      
      
    }catch(err){
      console.log(err)
    }
    

  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(inputs)

    try{
       const data=await sendData();

       if (data && data.message) {
       setError(data.message)
       
       if (data.User.role === "admin") {
        navigate("/newUsers");
       }else if(data.User.role === "citizen"){
        navigate("/");
       }
       
      // } else if (response.User.role === "seller") {
      //   navigate("/profile");
      // } else {
      //   navigate("/products");
      // }
       dispatch(autheticationActions.login());
       }else {
        setError("Check your password and email please!!!")
       }
       
    }catch(err){
      console.log(err)
    }
  }

  return (

  
    <div className='form'>
      <form onSubmit={handleSubmit}>

      <h1><center>Login</center></h1>
        

        <div>
        <label>Email:</label>
        <input type="email" name='email' value={inputs.email} onChange={handleChange}/>
        </div>
        

        
       
        <div>
        <label>Password:</label>
        <input type="password" name="password" value={inputs.password} onChange={handleChange}/>
        </div>
        
        <div>
        <button type="submit" className="btn custom-button">Submit</button>
        </div>
        
        
      </form>

      {error && <div className="error">{error}</div>}
<br/>

      <p><Link to='/forgetPassword'><center>Forget Password/Reset Password</center></Link></p>
 
      </div>
  )
}

export default LoginForm