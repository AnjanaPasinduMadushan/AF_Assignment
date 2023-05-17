import React, { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DeleteAcc() {

  const navigate = useNavigate()

  const [password, setPwd] = useState('');

  const sendDeletion = async () => {

    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `You won't be able get your account and its record again`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete my account',
      })

      if (result.isConfirmed) {
        const res = await axios.post(`http://localhost:8070/User/deleteAcc`, {
          password
        })

        const data = await res.data;
        console.log(data)
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `${JSON.stringify(data.message)}`,
        })
        navigate('/signUp')
        window.location.reload();
        return data;
      }
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
    console.log(password)

    try {
      await sendDeletion();

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>

        <h1><center>Enter Your Password</center></h1>


        <div>
          <input type="password" name='password' value={password} onChange={(e) => setPwd(e.target.value)} placeholder='Enter Your Password' />
        </div>


        <div>
          <button type="submit" className="btn custom-button">Submit</button>
        </div>


      </form>


    </div>
  )
}
