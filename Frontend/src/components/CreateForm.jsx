import {complaintsStore} from "../stores/complaintsStore";
import '../asset/CreateForm.css'
import React, { useState, useEffect } from "react";
import Upload from "./Upload";

export default function CreateForm(props) {
  // const [clickTime, setClickTime] = useState(null);
  // const [showForm, setShowForm] = useState(false);
  const { uploadComponent } = props;
 

  const complaintStore = complaintsStore();


  if (complaintStore.updateForm._id) return <></>;

  return (
    <div className="form_comaplin">
        <form onSubmit={complaintStore.createComplaint}>
           <h1><center>Create new Complaint</center></h1>

          <input
            type="text"
            onChange={complaintStore.updateCreateFormField}
            value={complaintStore.createForm.title}
            name="title"
            placeholder="type your complaint-Title"
            className="complaint_text"
          />

          <br/>
          <br/>
          <textarea
            onChange={complaintStore.updateCreateFormField}
            value={complaintStore.createForm.body}
            name="body"
            placeholder="type your complaint"
            className="textarea"
          />
          
          <div>
       
      </div>

      <div>
      {/* other form fields */}
      {uploadComponent}

      <Upload/>

      <button type="submit" className="custom-button">Submit</button>
    </div>
        </form>
     
     
    </div>
  );
}
