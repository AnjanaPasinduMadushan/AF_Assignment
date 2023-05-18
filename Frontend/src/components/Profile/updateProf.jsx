import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../../assets/forms.css'

const UpdateProf = () => {

  const navigate = useNavigate();
  const id = useParams();

  const [inputs, setInputs] = useState({
    name: "",
    mobile: "",
    email: ""
  })

  const handleChange = (e) => {

    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))

  }

  useEffect(() => {

    const getUser = async () => {
      try {
        await axios.get(`http://localhost:8070/User/profile`).then((res) => {
          setInputs(res.data.user)
        })
      } catch (err) {
        console.log(err)
      }
    }

    getUser()

  }, [id])

  const sendData = async () => {

    try {

      const result = await Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Update!',
      })
      if (result.isConfirmed) {
        const res = await axios.patch("http://localhost:8070/User/updateProfile", {
          name: inputs.name,
          mobile: inputs.mobile,
          email: inputs.email,
        })

        const data = await res.data;
        console.log(data)
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `${JSON.stringify(data.message)}`,
        })
        navigate('/profile')
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
    console.log(inputs)
    try {
      await sendData();

    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div className='forms'>

      <h1 id='update'>Update Account Details</h1>
      <form onSubmit={handleSubmit}>

        <div className='inputs'>
          <label>Name:</label>
          <input type="text" name='name' value={inputs.name} onChange={handleChange} />
        </div>

        {/* <div className='inputs'>
          <label>Age:</label>
          <input type="number" name='age' value={inputs.age} onChange={handleChange} />
        </div> */}


        <div className='inputs'>
          <label>Mobile:</label>
          <input type="text" name='mobile' value={inputs.mobile} onChange={handleChange} />
        </div>


        <div className='inputs'>
          <label>Email:</label>
          <input type="email" name='email' value={inputs.email} onChange={handleChange} />
        </div>

        <div className='inputs'>
          <button type="submit" className="btn custom-button">Update</button>
        </div>


      </form>
    </div>
  )
}

export default UpdateProf