import React, { useEffect, useState } from 'react'
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useNavigate } from 'react-router-dom';
import '../../assets/profile.css'

const Profile = () => {

    const [user, setUser] = useState({})

    const navigate = useNavigate()

    const sendProfileReq = async () => {

        try{
            const res = await axios
            .get("http://localhost:8070/User/profile", {
              withCredentials: true,
            })

          const data = await res.data;
          console.log(data)
          return data;
          
        }catch(err){
            console.log(err)
        }
        
      };

      useEffect(()=>{
        sendProfileReq().then((data)=>setUser(data.user))
      }, [])

console.log(user)

const handleDelete = async() => {

  try{
    await axios.delete(`http://localhost:8070/User/deleteAcc`).then(()=>navigate("/signUp"))
  }catch(err){
    console.log(err)
  }
  
}
      
  return (
    
     <div className="user-container">
      {user && user.role === 'admin' && (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <button onClick={() => navigate(`/currentUsers`)} className='custome_btn'>Current Users</button>
  
</div>
)}

<br/>{user &&(<div className='info'>
        <h1 className='detail'>Name:{user.name}</h1>
        <h1 className='detail'>Mobile:{user.mobile}</h1>
        <h1 className='detail'>E-mail:{user.email}</h1>
        <h1 className='detail'>NIC:{user.NIC}</h1>
        <h1 className='detail'>I am a {user.role}</h1>
        </div>)}
        
        <button className="update-button" onClick={()=>navigate(`/updateProfile/${user._id}`)}>UPDATE ACC</button>
        <button className="update-button" onClick={handleDelete}>DELETE ACC</button></div>
  )
}

export default Profile