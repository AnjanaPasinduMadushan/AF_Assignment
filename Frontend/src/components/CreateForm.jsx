import complaintsStore from "../stores/complaintsStore";
import '../asset/CreateForm.css';
import React, { useState } from 'react';

export default function CreateForm() {

  const [clickTime, setClickTime] = useState(null);

  const handleClick = () => {
    const time = new Date();
    setClickTime(time.toLocaleTimeString());
  };

  const complaintStore = complaintsStore();

  if (complaintStore.updateForm._id) return <></>;

  return (
    <div className="form">
      <h2>Create new Complaint</h2>
      <form onSubmit={complaintStore.createComplaint}>
        <input
          onChange={complaintStore.updateCreateFormField}
          value={complaintStore.createForm.title}
          name="title"
        />
        <textarea
          onChange={complaintStore.updateCreateFormField}
          value={complaintStore.createForm.body}
          name="body"
        />
        <button onClick={handleClick} type="submit" >Create Complaint</button>
         <div>
        {clickTime && <p>Last post created at {clickTime}</p>}
      </div>
      </form>
     
     
    </div>
  );
}


