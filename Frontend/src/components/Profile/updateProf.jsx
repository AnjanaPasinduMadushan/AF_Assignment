import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../../assets/forms.css'

const UpdateProf = () => {


    const id = useParams()
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({
        name:"",
        age:"",
        mobile:"",
        email:""
    })

    const handleChange = (e) =>{

        setInputs((prevState)=> ({
            ...prevState, 
            [e.target.name] : e.target.value
          }))

    }

    useEffect(()=>{

        const getUser = async() => {
            try{
                await axios.get(`http://localhost:8070/User/profile`).then((res)=>{
                    setInputs(res.data.user)
                })
            }catch(err){
                console.log(err)
            }
        }

        getUser()

    }, [id])

    const sendData = async()=>{

        try{
        const res = await axios.patch("http://localhost:8070/User/updateProfile", {
        name:inputs.name,
        age:inputs.age,
        mobile:inputs.mobile,
        email:inputs.email,
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
                 setError("Check entered mobile and email")
                }
            
        }catch(err){
            console.log(err)
        }
        
    }

  return (
    <div className='forms'>

      <h1 id='update'>Update Account Details</h1>
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
        <label>Mobile:</label>
        <input type="text" name='mobile' value={inputs.mobile} onChange={handleChange}/>
        </div>
        

        <div className='inputs'> 
        <label>Email:</label>
        <input type="email" name='email' value={inputs.email} onChange={handleChange}/>
        </div>

        <div className='inputs'>
        <button type="submit" className="btn custom-button">Update</button>
        </div>
        
        
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default UpdateProf