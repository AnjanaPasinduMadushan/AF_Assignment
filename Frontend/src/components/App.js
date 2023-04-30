import { useState, useEffect } from "react";
import axios from "axios";
import complaintsStore from "../stores/complaintsStore";
import Complaints from "./Complaints";
import UpdateForm from "./UpdateForm";
import CreateForm from "./CreateForm";

function App() {
  const store = complaintsStore();

  // Use effect
  useEffect(() => {
    store.fetchComplaints();
  }, []);

  return (
    <div className="App">
      <CreateForm />
      <Complaints />

      <UpdateForm />
    </div>
  );
}

export default App;
