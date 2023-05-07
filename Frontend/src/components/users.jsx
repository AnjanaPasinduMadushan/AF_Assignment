import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;
import '../assets/users.css'
import { AuthContext } from './AuthContext';

const Users = () => {

    const { userData, getUserData } = useContext(AuthContext);
    const [users, setUsers] = useState([])
    const history = useNavigate()

    console.log(userData)

    useEffect(()=>{
        getUserData();
        const getUsers=async()=>{
            
            const res = await axios.get('http://localhost:8070/User/newUsers', {withCredentials:true}).catch((err)=>{
                console.log(err)
            })
            setUsers(res.data.users)
            console.log(res.data.users)
        }

        getUsers();
    }, [])

    const hanldeVerifying = async(userId) => {
        try{

            const res = await axios.patch(`http://localhost:8070/User/verifyUser/${userId}`,{withCredentials:true}, {
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

            const res = await axios.delete(`http://localhost:8070/User/UnverifyUser/${userId}`, {withCredentials:true})
            
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
        <br/>

       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <button onClick={() => history(`/currentUsers`)} className='custome_btn'>Current Users</button>
</div>
        <div>
        {users && users.length>0 ? (
            <table className='users_table'>
                <thead>
                <tr>
                <th className='tableCell' id="tableCell_td">NIC</th>
                <th className='tableCell' id="tableCell_td">NAME</th>
                <th className='tableCell' id="tableCell_td">EMAIL</th>
                <th className='tableCell' id="tableCell_td">MOBILE</th>
                <th className='tableCell' id="tableCell_td">ACTIONS</th>
                </tr>
                </thead>
            
            <tbody>
            {users.map((user, key)=>(
            <tr  key={key}>
                <td className='tableCell'>{user.NIC}</td>
                <td className='tableCell'>{user.name}</td>
                <td className='tableCell'>{user.email}</td>
                <td className='tableCell'>{user.mobile}</td>
                <th className='tableCell'><button onClick={()=>hanldeVerifying(user._id)}>Verify</button>
                <button onClick={()=>handleUnverify(user._id)}>Unverify</button></th>
            </tr>
            ))}
            </tbody>
           
                
            </table>)
            :(<h1 className='message'><center>There are not any users sent Account creation requests!!!</center></h1>)}
        </div>
    </div>
  )
}

export default Users