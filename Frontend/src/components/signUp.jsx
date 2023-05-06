import React, {useState} from 'react'
import axios from 'axios'
import '../assets/forms.css'

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

    const [error, setError] = useState("");
    const handleChange = async(e)=>{
        setInputs((previousState)=>({
            ...previousState,
            [e.target.name]:e.target.value
        }))
    }

    const sendData = async()=>{

        try{
        const res = await axios.post("http://localhost:8070/User/signUp", {
        name:inputs.name,
        age:inputs.age,
        NIC:inputs.NIC,
        mobile:inputs.mobile,
        email:inputs.email,
        password:inputs.password,
        role:inputs.role,
        isChecking:inputs.isChecking
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
            const data = await sendData();
            if (data && data.message) {
                setError(data.message)
                }else {
                 setError("Check entered NIC, mobile and email")
                }
            
        }catch(err){
            console.log(err)
        }
        
    }


  return (
    <div className='forms'>    
    <form onSubmit={handleSubmit}>

      <div className='inputs'>
      <label className='signUp_lable'>Name:</label>
      <input type="text" name='name' value={inputs.name} onChange={handleChange}/>
      </div>
      

      <div className='inputs'>
      <label className='signUp_lable'>Age:</label>
      <input type="number" name='age' value={inputs.age} onChange={handleChange}/>
      </div>

      <div className='inputs'>
      <label className='signUp_lable'>NIC:</label>
      <input type="text" name='NIC' value={inputs.NIC} onChange={handleChange}/>
      </div>

      <div className='inputs'>
      <label className='signUp_lable'>Mobile:</label>
      <input type="text" name='mobile' value={inputs.mobile} onChange={handleChange}/>
      </div>
      

      <div className='inputs'> 
      <label className='signUp_lable'>Email:</label>
      <input type="email" name='email' value={inputs.email} onChange={handleChange}/>
      </div>
      
      <div className='inputs'>
      <label className='signUp_lable'>Password:</label>
      <input type="password" name="password" value={inputs.password} onChange={handleChange}/>
      </div>
      
      <div className='inputs'>
      <button type="submit" className="btn custom-button">Submit</button>
      </div>
      
      
    </form>
    {error && <div className="error">{error}</div>}
  </div>
  )
}

export default SignUp