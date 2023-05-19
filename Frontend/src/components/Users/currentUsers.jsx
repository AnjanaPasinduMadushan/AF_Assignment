import React, { useState, useEffect } from 'react'
import axios from 'axios'
axios.defaults.withCredentials = true;
import '../../assets/users.css'
import { useNavigate } from 'react-router-dom';

const CurrentUsers = () => {


  const history = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get('http://localhost:8070/User/oldUsers', { withCredentials: true }).catch((err) => {
        console.log(err)
      })
      setUsers(res.data.users)
      console.log(res.data.users)
    }

    getUsers();
  }, [])



  return (
    <div>

      <br />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1>Registered Users</h1>
        {/* <button onClick={() => history(`/newUsers`)} className='custome_btn'>Requested Users</button> */}
      </div>
      <div>
        {users && users.length > 0 ? (
          <table className='users_table'>
            <thead>
              <tr>
                <th className='tableCell' id="tableCell_td">NAME</th>
                <th className='tableCell' id="tableCell_td">EMAIL</th>
                <th className='tableCell' id="tableCell_td">MOBILE</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, key) => (
                <tr key={key}>
                  <td className='tableCell'>{user.name}</td>
                  <td className='tableCell'>{user.email}</td>
                  <td className='tableCell'>{user.mobile}</td>
                </tr>
              ))}
            </tbody>


          </table>)
          : (<h1><center>There are not any current users!!!</center></h1>)}
      </div>
    </div>
  )
}

export default CurrentUsers