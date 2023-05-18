import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import '../asset/CreateForm.css';

export default function UpdateForm() {
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState({ title: "", description: "" });
  const {id} = useParams();

  const handleChange = (e) => {
    setComplaint((prevState)=>({...prevState, [e.target.name]:e.target.value}));
  }

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:8070/complaint/complaints/${id}`);
      setComplaint(res.data.complaint);
      

    } catch (error) {
      console.log(error);
    }
  }

  async function submit(e) {
    e.preventDefault();

    const data = {
      title: complaint.title,
      description: complaint.description,
      image: "dummy"
    }

    try {
      const complaint = await axios.put(`http://localhost:8070/complaint/complaints/${id}`, data);
      swal("successs");
      navigate(-1);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(()=>{
    getData()
  },[]);

  return (
    <div className="form_comaplin">
      <form onSubmit={submit}>
        <h1><center>Update Complaint</center></h1>

        <input
          type="text"
          onChange={handleChange}
          value={complaint.title}
          name="title"
          placeholder="type your complaint-Title"
          className="complaint_text"
        />

        <br />
        <br />
        <textarea
          onChange={handleChange}
          value={complaint.description}
          name="description"
          placeholder="type your complaint"
          className="textarea"
        />

        <div>
          {/* other form fields
          {uploadComponent}

          <Upload /> */}

          <button type="submit" className="custom-button">Submit</button>
        </div>
      </form>


    </div>
  );
}
