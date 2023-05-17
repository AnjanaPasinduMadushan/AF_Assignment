import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import '../assets/forms.css'

const SignUp = () => {


  const [inputs, setInputs] = useState({
    name: "",
    age: "",
    NIC: "",
    mobile: "",
    email: "",
    password: "",
    role: 'citizen',
  })

  const handleChange = async (e) => {
    setInputs((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value
    }))
  }

  const sendData = async () => {

    try {
      const res = await axios.post("http://localhost:8070/User/signUp", {
        name: inputs.name,
        age: inputs.age,
        NIC: inputs.NIC,
        mobile: inputs.mobile,
        email: inputs.email,
        password: inputs.password,
        role: inputs.role,
        isChecking: inputs.isChecking
      })

      const data = await res.data;
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `${JSON.stringify(data.message)}`,
      })
      return data;
    } catch (err) {
      console.log(err)
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${JSON.stringify(err.response.data.message)}`,
        });
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log(err.message);
      }
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs)
    try {
      await sendData();

    } catch (err) {
      console.log(err)
    }

  }


  return (
    <div className='forms'>
      <h1><center>Sign Up</center></h1>
      <form onSubmit={handleSubmit}>

        <div className='inputs'>
          <label className='signUp_lable'>Name:</label>
          <input type="text" name='name' value={inputs.name} onChange={handleChange} className="common_css" />
        </div>


        <div className='inputs'>
          <label className='signUp_lable'>Age:</label>
          <input type="number" name='age' value={inputs.age} onChange={handleChange} />
        </div>

        <div className='inputs'>
          <label className='signUp_lable'>NIC:</label>
          <input type="text" name='NIC' value={inputs.NIC} onChange={handleChange} className="common_css" />
        </div>

        <div className='inputs'>
          <label className='signUp_lable'>Mobile:</label>
          <input type="text" name='mobile' value={inputs.mobile} onChange={handleChange} className="common_css" />
        </div>


        <div className='inputs'>
          <label className='signUp_lable'>Email:</label>
          <input type="email" name='email' value={inputs.email} onChange={handleChange} className="common_css" />
        </div>

        <div className='inputs'>
          <label className='signUp_lable'>Password:</label>
          <input type="password" name="password" value={inputs.password} onChange={handleChange} className="common_css" />
        </div>

        <div className='inputs'>
          <button type="submit" className="btn custom-button">Submit</button>
        </div>


      </form>
    </div>
  )
}

export default SignUp