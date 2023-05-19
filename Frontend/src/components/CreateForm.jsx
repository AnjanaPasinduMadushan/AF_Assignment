// import { complaintsStore } from "../stores/complaintsStore";
// import "../asset/CreateForm.css";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Upload from "./Upload";
// import swal from "sweetalert";

// export default function CreateForm(props) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   async function submit(e) {
//     e.preventDefault();

//     const data = {
//       title,
//       description,
//       image: "dummy",
//     };

//     try {
//       const complaint = await axios.post(
//         "http://localhost:8070/complaint/complaints",
//         data
//       );
//       swal("successs");
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   // const { uploadComponent } = props;

//   // const complaintStore = complaintsStore();

//   // if (complaintStore.updateForm._id) return <></>;

//   return (
//     <div className="form_comaplin">
//       <form onSubmit={submit}>
//         <h1>
//           <center>Create new Complaint</center>
//         </h1>
//         Your confidentiality will be ensured.
//         <input
//           type="text"
//           onChange={(e) => setTitle(e.target.value)}
//           value={title}
//           name="title"
//           placeholder="type your complaint-Title"
//           className="complaint_text"
//         /> Report Corruption
//         <br />
//         <br />  Please describe the incident *
//         <textarea
//           onChange={(e) => setDescription(e.target.value)}
//           value={description}
//           name="description"
//           placeholder="type your complaint"
//           className="textarea"
//         />
//         <div>
//           {/* other form fields
//           {uploadComponent}

//           <Upload /> */}

//           <button type="submit" className="custom-button">
//             Submit
//           </button>
//         </div>
//         <Upload/>
//       </form>

 
//     </div>
//   );
// }
import { complaintsStore } from "../stores/complaintsStore";
import "../asset/CreateForm.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Upload from "./Upload";
import swal from "sweetalert";

export default function CreateForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [titleWordCount, setTitleWordCount] = useState(0);
  const [descriptionWordCount, setDescriptionWordCount] = useState(0);

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
        const complaint = await axios.post(
          "http://localhost:8070/complaint/complaints",
          data
        );
        swal("successs");
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
        Your confidentiality will be ensured.
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
        Report Corruption
        <br />
        <br /> Please describe the incident *
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          name="description"
          placeholder="Type your complaint"
          className="textarea"
        />
        {descriptionError && <p className="error">{descriptionError}</p>}
        Word Count: {descriptionWordCount} / 1000
        <div>
          <Upload />
          <button type="submit" className="custom-button">
            Submit
          </button>
        </div>
      </form>
      <br></br><br></br>
    </div>
  );
}

