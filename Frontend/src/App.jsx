import { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
import complaintsStore from "./stores/complaintsStore";
import Complaints from "./components/Complaints";
import UpdateForm from "./components/UpdateForm";
import CreateForm from "./components/CreateForm";
import Upload from "./components/Upload";



// import Upload from "./Upload";

function App() {
  const store = complaintsStore();

  // Use effect
  useEffect(() => {
    store.fetchComplaints();
  }, []);



  return (
    <div className="App">
   
      <CreateForm uploadComponent={<Upload />} />
      <Complaints />
      <UpdateForm />
    </div>
  );
}

export default App;
