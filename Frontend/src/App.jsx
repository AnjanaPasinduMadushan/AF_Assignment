import { BrowserRouter, Routes, Route } from "react-router-dom";
import Complaints from "./pages/complaints";
import "./App.css";

function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<Complaints />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
