import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../assets/users.css'
import { useNavigate } from 'react-router'
axios.defaults.withCredentials = true;
import Swal from 'sweetalert2';

const NewComplaints = () => {

  const [complaints, setComplaints] = useState('')

  const navigate = useNavigate()
  useEffect(() => {
    // getUserData();
    const getComplaints = async () => {

      const res = await axios.get("http://localhost:8070/complaint/getNewComplaints").catch((err) => {
        console.log(err)
      })
      setComplaints(res.data.complaints)
      console.log(res.data.complaints)
    }

    getComplaints();
  }, [])


  const hanldeVerifying = async (complaintId) => {
    let newComplaints;
    try {

      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `You won't be able to revert this complain again to unverify!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, verify complaint!',
      })
      if (result.isConfirmed) {
        const res = await axios.patch(`http://localhost:8070/complaint/verifyComplaint/${complaintId}`, { isApproved: true },
          { withCredentials: true }
        )
        newComplaints = res.data;

        setComplaints((prevComplaint) =>
          prevComplaint.filter((complaint) => complaint._id !== complaintId));
        Swal.fire('Deleted!', `${JSON.stringify(newComplaints.message)}`, 'success')
      }
      Swal.fire('Verified', `${JSON.stringify(newComplaints.message)}`, 'success')
    } catch (err) {
      console.log(err)
      Swal.fire('Error', 'An error occurred while Verifying the compaint', 'error');
    }
  }


  const handleUnverify = async (complaintId) => {
    let newComplaints;

    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `You won't be able to revert this complaint again to verify!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Unverify complaint!',
      })
      if (result.isConfirmed) {
        const res = await axios.delete(`http://localhost:8070/complaint/unverifyComplaint/${complaintId}`, { withCredentials: true })

        newComplaints = res.data;

        setComplaints((prevComplaint) =>
          prevComplaint.filter((complaint) => complaint._id !== complaintId));
        Swal.fire('Deleted!', `${JSON.stringify(newComplaints.message)}`, 'success')
      }

    } catch (err) {
      console.log(err)
      Swal.fire('Error', 'An error occurred while Verifying the complaint', 'error');
    }
  }


  function dateTimeString(unixTime) {
    const date = new Date(unixTime * 1);
    const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const dateTimeString = date.toLocaleString('en-GB', options);
    return dateTimeString;
  }


  return (
    <div>
      <br />
      <center>
        <button onClick={() => navigate('/current_Complaints')} className='btn btn-warning'>Current Complaints</button>
      </center>
      <div>

        {complaints && complaints.length > 0 ? (


          <table className='users_table'>
            <thead>
              <tr>
                <th className='tableCell' id="tableCell_td">TITLE</th>
                <th className='tableCell' id="tableCell_td">DESCRIPTION</th>
                <th className='tableCell' id="tableCell_td">DATE</th>
                <th className='tableCell' id="tableCell_td">ACTIONS</th>
              </tr>
            </thead>

            <tbody>

              {complaints.map((complaints, key) => (

                <tr key={key}>

                  <td className='tableCell'>{complaints.title}</td>
                  <td className='tableCell'>{complaints.description}</td>
                  <td className='tableCell'>{dateTimeString(complaints.date)}</td>
                  <td className='tableCell'><button onClick={() => hanldeVerifying(complaints._id)} className='btn btn-warning'>Verify</button>
                    <br /><br />
                    <button onClick={() => handleUnverify(complaints._id)} className='btn btn-danger'>Unverify</button></td>
                </tr>
              ))}
            </tbody>


          </table>)
          : (<h1 className='message'><center>There are not any new Complaints sent for approval!!!</center></h1>)}
      </div></div>
  )
}

export default NewComplaints