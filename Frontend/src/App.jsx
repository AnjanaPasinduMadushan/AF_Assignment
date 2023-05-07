import { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
import complaintsStore from "./stores/complaintsStore";
import Complaints from "./components/Complaints";
import UpdateForm from "./components/UpdateForm";
import CreateForm from "./components/CreateForm";
import Upload from "./components/Upload";
import Navbar from "./components/Navbar";
// import Upload from "./Upload";

function App() {


  const store = complaintsStore();

  // Use effect
  useEffect(() => {
    store.fetchComplaints();
  }, []);



  const history = useState();

  const handleClick = () => {
    history.push('/another-page');
  }
  return (
    <div className="App">

<button onClick={handleClick}>Go to Another Page</button>

<Navbar/>

      <CreateForm   uploadComponent={<Upload />}/>
      
      <Complaints />
      <UpdateForm />
     
    
    

    
    </div>
  );
}

export default App;
