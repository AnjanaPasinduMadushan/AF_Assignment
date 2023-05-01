import React, { useState } from 'react'
import axios from 'axios'

const LoginForm = () => {


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
   
    const res = await axios.post("http://localhost:8070/User/login", {
      email:inputs.email,
      password:inputs.password
    }).catch((err)=>console.log(err));

    const data = await res.data;
    return data;

  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(inputs)

    try{
       await sendData();
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>

      <h1>Login</h1>
        

        <div>
        <label>Email:</label>
        <input type="email" name='email' value={inputs.email} onChange={handleChange}/>
        </div>
        

        
       
        <div>
        <label>Password:</label>
        <input type="password" name="password" value={inputs.password} onChange={handleChange}/>
        </div>
        
        <div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </div>
        
        
      </form>
    </div>
  )
}

export default LoginForm