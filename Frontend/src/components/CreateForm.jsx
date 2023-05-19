import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import '../asset/CreateForm.css';

export default function CreateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      image: "dummy"
    }

    try {
      const complaint = await axios.post("http://localhost:8070/complaint/complaints", data);
      swal("successs");
      navigate(-1);
    } catch (e) {
      console.log(e);
    }
  }
  // const { uploadComponent } = props;


  // const complaintStore = complaintsStore();


  // if (complaintStore.updateForm._id) return <></>;

  return (
    <div className="form_comaplin">
      <form onSubmit={submit}>
        <h1><center>Create new Complaint</center></h1>

        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name="title"
          placeholder="type your complaint-Title"
          className="complaint_text"
        />

        <br />
        <br />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
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
