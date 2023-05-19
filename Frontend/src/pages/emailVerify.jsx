import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import '../assets/forms.css'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function EmailVerify() {

  const navigate = useNavigate();

  const [inputs, setinputs] = useState({
    email: "",
    otp: ""
  })

  const sendData = async () => {

    try {
      const res = await axios.post('http://localhost:8070/User/verifyEmail', {
        email: inputs.email,
        otp: inputs.otp
      })

      const data = res.data;
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `${JSON.stringify(data.message)}`,
      })
      navigate('/login')
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

  const handleChange = async (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }


  return (

    <div className='emailVerify'>
      <div className='forms'>
        <form onSubmit={handleSubmit}>
          <div className='inputs'>
            <label className='signUp_lable'>Email:</label>
            <input type="email" name='email' value={inputs.email} onChange={handleChange} className="common_css" />
          </div>

          <div className='inputs'>
            <label className='signUp_lable'>OTP:</label>
            <input type="text" name="otp" value={inputs.otp} onChange={handleChange} className="common_css" />
          </div>

          <div className='inputs'>
            <button type="submit" className="btn custom-button">Submit</button>
          </div>
        </form>

      </div >
    </div>
  )
}
