import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import '../assets/status.css'

const ComplaintStatus = () => {

    const {id} = useParams()

    const [complaints, setComplaints] = useState(null)

    useEffect(()=>{
        const getCurrComplaints=async()=>{
            const res = await axios(`http://localhost:8070/complaint/complaints/${id}`).catch((err)=>{
                console.log(err)
            })
    
            setComplaints(res.data.complaint)
             console.log(res.data.complaint)
        }
    
        getCurrComplaints()
    }, [])

    const handleUpdateStatus = async (cId, newStatus) => {
        const res = await axios.patch(`http://localhost:8070/complaint/updateStatus/${cId}`, {
          status: newStatus
        }).catch((err) => {
          console.log(err);
        });
        setComplaints({...complaints, status: newStatus});
      };

  return (

    <div className='details'>
    <div>{complaints && (<div className='info'>
    <h1 className='detail'>Title:{complaints.title}</h1>
    <h1 className='detail'>Description:{complaints.description}</h1>
    <h1 className='detail' style={{color: 'red'}}>Status:{complaints.status}</h1>
    <button onClick={() => handleUpdateStatus(complaints._id, "pending")} className='btn btn-info'style={{marginLeft: '10px'}}>
              pending
            </button>
            <button onClick={() => handleUpdateStatus(complaints._id, "forward")} className='btn btn-info' style={{marginLeft: '10px'}}>
            forward
            </button>
            <button onClick={() => handleUpdateStatus(complaints._id, "Checking")} className='btn btn-info' style={{marginLeft: '10px'}}>
            Checking
            </button>
            <button onClick={() => handleUpdateStatus(complaints._id, "completed")} className='btn btn-info' style={{marginLeft: '10px'}}>
            completed
            </button>
    <h1 className='detail'>No of Votes:{complaints.vote}</h1>
    <h1 className='detail'>User ID: {complaints.userId}</h1>
  </div>)}
  </div>

  </div>
  )
}

export default ComplaintStatus