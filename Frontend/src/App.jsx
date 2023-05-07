import { BrowserRouter, Routes, Route } from "react-router-dom";
import Complaints from "./pages/complaints";
import Feedback from "./pages/Addfeedback";
import "./App.css";

function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<Complaints />} />
          <Route path="/feedback" element={<Feedback/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
