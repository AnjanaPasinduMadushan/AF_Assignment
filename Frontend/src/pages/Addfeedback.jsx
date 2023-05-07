import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddFeedback() {

    const [feedback, setfeedback] = useState({
         feedback:""
    });
  
    const handleChangeText = (name, value) => {
      setfeedback({ ...feedback, [name]: value.target.value });
    };
    const addFeedback = (e) => {
        e.preventDefault();
        console.log("submit");
        axios
          .post("http://localhost:8070/feedback/addfeedback", feedback)
          .then(() => {
           // swal.fire(`successfully added`);
           // navigate("/profil");
          })
          .catch((error) => {
            console.log(error);
          });
      };
      const navigate = useNavigate();
      return (
        <form >
            <label>Feedback</label>
            <div>
            <input 
            name ="feedback"
            type ="text"
            title = "Enter the Feedback here"
            required
            onChange={(value)=>handleChangeText("feedback",value)}
             />
            </div>
           

        <button  type="submit">
          Submit
        </button>
        </form>
         
      );
    }