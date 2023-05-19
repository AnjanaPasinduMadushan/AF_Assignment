import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const CurrentComplaints = () => {

  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([])
  useEffect(() => {
    const getCurrComplaints = async () => {
      const res = await axios("http://localhost:8070/complaint/currentComplaints").catch((err) => {
        console.log(err)
      })

      setComplaints(res.data.complaints)
      console.log(res.data.complaints)
    }

    getCurrComplaints()
  }, [])

  function dateTimeString(unixTime) {
    const date = new Date(unixTime * 1);
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const dateTimeString = date.toLocaleString("en-GB", options);
    return dateTimeString;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1>Ongoing Complaints</h1>
      </div>
      <div>

        {complaints && complaints.length > 0 ? (


          <table className='users_table'>
            <thead>
              <tr>
                <th className='tableCell' id="tableCell_td">TITLE</th>
                <th className='tableCell' id="tableCell_td">DESCRIPTION</th>
                <th className='tableCell' id="tableCell_td">VOTE</th>
                <th className='tableCell' id="tableCell_td">DATE</th>
                <th className='tableCell' id="tableCell_td">ACTIONS</th>
              </tr>
            </thead>

            <tbody>

              {complaints.map((complaints, key) => (

                <tr key={key}>

                  <td className='tableCell'>{complaints.title}</td>
                  <td className='tableCell'>{complaints.description}</td>
                  <td className='tableCell'>{complaints.vote}</td>
                  <td className='tableCell'>{dateTimeString(complaints.date)}</td>
                  <td className='tableCell'><button onClick={() => navigate(`/complaint_Status/${complaints._id}`)} className='btn btn-warning'>VIEW</button></td>
                </tr>
              ))}
            </tbody>


          </table>)
          : (<h1 className='message'><center>There are not any new Complaints sent for approval!!!</center></h1>)}
      </div></div>
  )
}

export default CurrentComplaints