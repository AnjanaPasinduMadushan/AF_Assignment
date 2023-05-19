import React, { useEffect, useState } from 'react'
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useNavigate } from 'react-router-dom';
import '../../assets/profile.css'
import '../../assets/users.css'
const Profile = () => {

  const [user, setUser] = useState({})

  const [complaints, setComplants] = useState([])

  const navigate = useNavigate()

  const sendProfileReq = async () => {

    try {
      const res = await axios
        .get("http://localhost:8070/User/profile", {
          withCredentials: true,
        })

      const data = await res.data;
      console.log(data)
      return data;

    } catch (err) {
      console.log(err)
    }

  };

  const sendComplainReq = async () => {

    try {
      const res = await axios
        .get("http://localhost:8070/complaint/getOwnComplaints", {
          withCredentials: true,
        })

      const data = await res.data;
      console.log(data)
      return data;

    } catch (err) {
      console.log(err)
    }

  };



  useEffect(() => {
    sendProfileReq().then((data) => setUser(data.user),
      sendComplainReq().then((data) => setComplants(data.complaints)))
  }, [])

  console.log(user)
  console.log("saf" + complaints)




  return (

    <div>
      <div className="user-container">

        <br />{user && (<div className='info'>
          <h1 className='detail'>Name:{user.name}</h1>
          <h1 className='detail'>Mobile:{user.mobile}</h1>
          <h1 className='detail'>E-mail:{user.email}</h1>
          <h1 className='detail'>NIC:{user.NIC}</h1>
          <h1 className='detail'>I am a {user.role}</h1>
        </div>)}

        <div style={{ display: 'inline-block' }}>
          <button className="update-button" onClick={() => navigate(`/updateProfile/${user._id}`)}>UPDATE ACC</button>
          <button className="delete-button" onClick={() => navigate(`/deleteProfile`)} style={{ marginLeft: '30px' }}>DELETE ACC</button>
        </div>

        {user && user.role === "citizen" && (

          <div>
            <hr />
            <hr />
            <h1>My Complaints</h1>

            {complaints.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th className='tableCell' id="tableCell_td">Title</th>
                    <th className='tableCell' id="tableCell_td">Description</th>
                    <th className='tableCell' id="tableCell_td">No of Votes</th>
                    <th className='tableCell' id="tableCell_td">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((myComplaints) => (
                    <tr key={myComplaints._id}>
                      <td className='tableCell'>{myComplaints.title}</td>
                      <td className='tableCell'>{myComplaints.description}</td>
                      <td className='tableCell'>{myComplaints.vote}</td>
                      <td className='tableCell'>
                        <button className='btn btn-info me-2' onClick={() => navigate(`/addFeedBack/${myComplaints._id}`)}>ADD FEEDBACK</button>
                        <button className='btn btn-warning' onClick={() => navigate(`/updateComplaint/${myComplaints._id}`)}>UPDATE 🖉</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <h1 className='message'>You have not posted any complaints</h1>}
          </div>

        )}
      </div>

    </div>
  )
}

export default Profile