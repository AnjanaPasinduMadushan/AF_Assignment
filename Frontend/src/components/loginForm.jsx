import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { autheticationActions } from './store'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../assets/forms.css'
const LoginForm = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setInputs((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value
    }))
  }

  const sendData = async () => {

    try {
      const res = await axios.post("http://localhost:8070/User/login", {
        email: inputs.email,
        password: inputs.password
      })

      const data = await res.data;
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `${JSON.stringify(data.message)}`,
      })
      console.log(data)
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
      const data = await sendData();

      if (data.User.role === "admin") {
        navigate("/newUsers");
      } else if (data.User.role === "citizen") {
        navigate("/complain");
      }

      dispatch(autheticationActions.login());

    } catch (err) {
      console.log(err)
    }
  }

  return (


    <div className='form'>
      <form onSubmit={handleSubmit}>

        <h1><center>Login</center></h1>


        <div>
          <label>Email:</label>
          <input type="email" name='email' value={inputs.email} onChange={handleChange} />
        </div>




        <div>
          <label>Password:</label>
          <input type="password" name="password" value={inputs.password} onChange={handleChange} />
        </div>

        <div>
          <button type="submit" className="btn custom-button">Submit</button>
        </div>


      </form>

      <br />

      {/* <center><p><Link to='/forgetPassword'>Forget Password/Reset Password</Link></p></center> */}

    </div>
  )
}

export default LoginForm