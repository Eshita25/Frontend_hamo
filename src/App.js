import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/nav";
import Home from "./components/homepage";
import Medicine from "./components/medicine";
import Footer from "./components/footer";
import Pulse from "./components/pulse";
import './App.css'
import SOS from "./components/sos";
import UploadPage from "./components/UploadPage";

const App = () => {
  return (
    <div className="App">
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medicine" element={<Medicine/>}/>
        <Route path="/pulse" element={<Pulse/>}/>
        <Route path="/send" element={<SOS/>}/>
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
      <Footer/>
    </Router>
    </div>
  );
};

export default App;
