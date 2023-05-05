import React, { useEffect, useState } from 'react'
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useNavigate } from 'react-router-dom';

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
          return data;
        }catch(err){
            console.log(err)
        }
        
      };

      useEffect(()=>{
        sendProfileReq().then((data)=>setUser(data.user))
      }, [])

console.log(user)
      
  return (
     <div>{user &&(<div>
        <h1>Name:{user.name}</h1>
        <h1>Mobile:{user.mobile}</h1>
        <h1>E-mail:{user.email}</h1>
        <h1>NIC:{user.NIC}</h1>
        <h1>I am a {user.role}</h1>
        </div>)}
        
        <button className="btn btn-info p-1 me-2 btn" onClick={()=>navigate(`/updateProfile/${user._id}`)}>UPDATE ACC</button></div>
  )
}

export default Profile