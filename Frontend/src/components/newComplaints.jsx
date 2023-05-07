import React, {useState, useEffect} from 'react'
import axios from 'axios'

const NewComplaints = () => {

  const [complaints, setComplaints] = useState('')

  useEffect(()=>{
    // getUserData();
     const getComplaints=async()=>{
         
         const res = await axios.get('http://localhost:8070/complaint/getNewComplaints', {withCredentials:true}).catch((err)=>{
             console.log(err)
         })
         setComplaints(res.data.complaints)
         console.log(res.data.complaints)
     }

     getComplaints();
 }, [])
  return (
    <div><div>
    {complaints && complaints.length>0 ? (
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
        {complaints.map((complaints, key)=>(
        <tr  key={key}>
            <td className='tableCell'>{complaints.title}</td>
            <td className='tableCell'>{complaints.description}</td>
            <td className='tableCell'>{complaints.date}</td>
            <th className='tableCell'><button>Verify</button>
            <button>Unverify</button></th>
        </tr>
        ))}
        </tbody>
       
            
        </table>)
        :(<h1 className='message'><center>There are not any new Complaints sent for approval!!!</center></h1>)}
    </div></div>
  )
}

export default NewComplaints