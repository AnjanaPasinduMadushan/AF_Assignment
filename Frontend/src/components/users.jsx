import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;
import '../assets/users.css'
import Swal from 'sweetalert2'
//import { AuthContext } from './AuthContext';

const Users = () => {

  //  const { userData, getUserData } = useContext(AuthContext);
  const [users, setUsers] = useState([])
  const history = useNavigate()

  // console.log(userData)

  useEffect(() => {
    // getUserData();
    const getUsers = async () => {

      const res = await axios.get('http://localhost:8070/User/newUsers', { withCredentials: true }).catch((err) => {
        console.log(err)
      })
      setUsers(res.data.users)
      console.log(res.data.users)
    }

    getUsers();
  }, [])

  const hanldeVerifying = async (userId) => {
    let newUsers;
    let status;
    try {

      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `You won't be able to revert this user again to unverify!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, verify user!',
      })

      if (result.isConfirmed) {
        const res = await axios.patch(`http://localhost:8070/User/verifyUser/${userId}`, { checkingIn: true },
          { withCredentials: true })

        newUsers = res.data;
        status = res.status;
        console.log(status)
        console.log(newUsers)
        if (status === 404) {
          Swal.fire('Error', 'User is not found', 'error')
        }
        setUsers((prevUsers) =>

          prevUsers.filter((user) => user._id !== userId));

        Swal.fire('Verified', `${JSON.stringify(newUsers.message)}`, 'success')

      }
    } catch (err) {
      console.log(err)
      Swal.fire('Error', 'An error occurred while Verifying the user', 'error');
    }
  }


  const handleUnverify = async (userId) => {
    let newUsers;
    let status;
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `You won't be able to revert this user again to verify!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Unverify user!',
      })
      if (result.isConfirmed) {
        const res = await axios.delete(`http://localhost:8070/User/UnverifyUser/${userId}`)

        newUsers = res.data;
        status = res.status;
        console.log(status)
        console.log(newUsers)

        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId));
        Swal.fire('Deleted!', `${JSON.stringify(newUsers.message)}`, 'success')


      }
    } catch (err) {
      console.log(err)
      Swal.fire('Error', 'An error occurred while Verifying the user', 'error');
    }
  }

  return (
    <div>


      <br />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button onClick={() => history(`/currentUsers`)} className='custome_btn'>Current Users</button>

        <button onClick={() => history(`/newComplaints`)} className='custome_btn'>New Complaints</button>

        <button onClick={() => history(`/feed`)} className='custome_btn'>View Feedbacks</button>
      </div>

      <h1><center>NEW ACCOUNT CREATION REQUESTS</center></h1>
      <div>
        {users && users.length > 0 ? (
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
              {users.map((user, key) => (
                <tr key={key}>
                  <td className='tableCell'>{user.NIC}</td>
                  <td className='tableCell'>{user.name}</td>
                  <td className='tableCell'>{user.email}</td>
                  <td className='tableCell'>{user.mobile}</td>
                  <th className='tableCell'><button onClick={() => hanldeVerifying(user._id)} className='btn btn-warning'>Verify</button>
                    <button onClick={() => handleUnverify(user._id)} className='btn btn-danger' style={{ marginLeft: '10px' }}>Unverify</button></th>
                </tr>
              ))}
            </tbody>


          </table>)
          : (<h1 className='message'><center>There are not any users sent Account creation requests!!!</center></h1>)}
      </div>
    </div>
  )
}

export default Users