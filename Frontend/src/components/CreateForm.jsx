import { complaintsStore } from "../stores/complaintsStore";
import '../asset/CreateForm.css'
import React, { useState, useEffect } from "react";
import axios from "axios";
import Upload from "./Upload";
import swal from "sweetalert";

export default function CreateForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
