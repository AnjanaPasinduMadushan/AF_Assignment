import React, {useState} from 'react'
import axios from 'axios'

const SignUp = () => {

    const [inputs, setInputs] = useState({
        name:"",
        age:"",
        NIC:"",
        mobile:"",
        email:"",
        password:"",
        role:'citizen',
        isChecking:false
    })


    const handleChange = async(e)=>{
        setInputs((previousState)=>({
            ...previousState,
            [e.target.name]:e.target.value
        }))
    }

    const sendData = async()=>{
        const res = await axios.post("http://localhost:8070/User/signUp", {
            name:inputs.name,
            age:inputs.age,
            NIC:inputs.NIC,
            mobile:inputs.mobile,
            email:inputs.email,
            password:inputs.password,
            role:inputs.role,
            isChecking:inputs.isChecking
        }).catch((err)=>console.log(err))
        
        const data = await res.data
        return data
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
    <div>      <h1>Register</h1>
    <form onSubmit={handleSubmit}>

      <div className='inputs'>
      <label>Name:</label>
      <input type="text" name='name' value={inputs.name} onChange={handleChange}/>
      </div>
      

      <div className='inputs'>
      <label>Age:</label>
      <input type="number" name='age' value={inputs.age} onChange={handleChange}/>
      </div>

      <div className='inputs'>
      <label>NIC:</label>
      <input type="text" name='NIC' value={inputs.NIC} onChange={handleChange}/>
      </div>

      <div className='inputs'>
      <label>Mobile:</label>
      <input type="text" name='mobile' value={inputs.mobile} onChange={handleChange}/>
      </div>
      

      <div className='inputs'> 
      <label>Email:</label>
      <input type="email" name='email' value={inputs.email} onChange={handleChange}/>
      </div>
      
      <div className='inputs'>
      <label>Password:</label>
      <input type="password" name="password" value={inputs.password} onChange={handleChange}/>
      </div>
      
      <div className='inputs'>
      <button type="submit" className="btn btn-primary">Submit</button>
      </div>
      
      
    </form>
  </div>
  )
}

export default SignUp