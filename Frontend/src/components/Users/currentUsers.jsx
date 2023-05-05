import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;


const CurrentUsers = () => {


    const [users, setUsers] = useState([])
    const history = useNavigate()

    useEffect(()=>{
        const getUsers=async()=>{
            const res = await axios.get('http://localhost:8070/User/oldUsers', {withCredentials:true}).catch((err)=>{
                console.log(err)
            })
            setUsers(res.data.users)
            console.log(res.data.users)
        }

        getUsers();
    }, [])



  return (
    <div>

        <div>
        {users && users.length>0 ? (
            <table>
                <thead>
                <tr>
                <th>NAME</th>
                <th>AGE</th>
                <th>EMAIL</th>
                <th>MOBILE</th>
                </tr>
                </thead>
            
            <tbody>
            {users.map((user, key)=>(
            <tr  key={key}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
            </tr>
            ))}
            </tbody>
           
                
            </table>)
            :(<h1><center>There are not any current users!!!</center></h1>)}
        </div>
    </div>
  )
}

export default CurrentUsers