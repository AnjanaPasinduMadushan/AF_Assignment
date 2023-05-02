import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Users = () => {


    const [users, setUsers] = useState([])

    useEffect(()=>{
        const getUsers=async()=>{
            const res = await axios.get('http://localhost:8070/User/newUsers')
            setUsers(res.data.users)
            console.log(res.data.users)
        }

        getUsers();
    }, [])

    const hanldeVerifying = async(userId) => {
        try{

            const res = await axios.patch(`http://localhost:8070/User/verifyUser/${userId}`, {
                checkingIn:true
            })
            const newUpdateUser = res.data;

            setUsers((prevUsers) => {
              const newUsers = [...prevUsers];
      
              const arrIndex = newUsers.findIndex(
                (user) => user._id === newUpdateUser._id
              );
              newUsers[arrIndex] = newUpdateUser;
      
              console.log(newUsers)
              return newUsers;
            });
        }catch(err){
            console.log(err)
        }
    }


    const handleUnverify = async(userId) =>{
        try{

            const res = await axios.delete(`http://localhost:8070/User/UnverifyUser/${userId}`)
            
            const newUpdateUser = res.data;

            setUsers((prevUsers) => {
              const newUsers = [...prevUsers];
      
              const arrIndex = newUsers.findIndex(
                (user) => user._id === newUpdateUser._id
              );
              newUsers[arrIndex] = newUpdateUser;
      
              console.log(newUsers)
              return newUsers;
            })

        }catch(err){
            console.log(err)
        }
    }

  return (
    <div>
        <div>
        {users && users.length>0 ? (
            <table>
                <thead>
                <tr>
                <th>NIC</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>MOBILE</th>
                <th>ACTIONS</th>
                </tr>
                </thead>
            
            <tbody>
            {users.map((user, key)=>(
            <tr  key={key}>
                <td>{user.NIC}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <th><button onClick={()=>hanldeVerifying(user._id)}>Verify</button>
                <button onClick={()=>handleUnverify(user._id)}>Unverify</button></th>
            </tr>
            ))}
            </tbody>
           
                
            </table>)
            :(<h1><center>There are not any users sent Account creation requests!!!</center></h1>)}
        </div>
    </div>
  )
}

export default Users