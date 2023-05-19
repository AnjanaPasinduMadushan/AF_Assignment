import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import "../asset/CreateForm.css";
import Upload from "./Upload";

export default function CreateForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [titleWordCount, setTitleWordCount] = useState(0);
  const [descriptionWordCount, setDescriptionWordCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setTitleWordCount(title.trim().split(" ").filter(Boolean).length);
    setDescriptionWordCount(description.trim().split(" ").filter(Boolean).length);
  }, [title, description]);

  async function submit(e) {
    e.preventDefault();

    if (validateForm()) {
      const data = {
        title,
        description,
        image: "dummy",
      };

      try {
        await axios.post("http://localhost:8070/complaint/complaints", data);
        swal("successs");
        navigate(-1);
      } catch (e) {
        console.log(e);
      }
    }
  }

  function validateForm() {
    let isValid = true;

    if (title.trim() === "") {
      setTitleError("Please enter a title");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (description.trim() === "") {
      setDescriptionError("Please enter a description");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  }

  return (
    <div className="form_comaplin">
      <form onSubmit={submit}>
        <h1>
          <center>Create new Complaint</center>
        </h1>
        <div style={{ fontSize: "15px", color: "gray" }}>Your confidentiality will be ensured.</div>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name="title"
          placeholder="Type your complaint title"
          className="complaint_text"
        />
        {titleError && <p className="error">{titleError}</p>}
        Word Count: {titleWordCount} /100
        <br />

        <br /> <div style={{ fontSize: "15px", color: "gray" }}>Please describe the incident *</div>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          name="description"
          placeholder="Type your complaint"
          className="textarea"
          style={{ width: "550px", height: "200px" }}
        />
        {descriptionError && <p className="error">{descriptionError}</p>}
        Word Count: {descriptionWordCount} / 500
        <div>
          <br />  <br />
          <Upload />  <br />

        </div>
      </form>
      <br></br><br></br>
    </div>
  );
}

