import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./pages/About";
import Jobs from "./pages/Jobs";
import Auth from "./pages/Auth";

const App = () => (
  <Router>
    <div className="flex flex-col ">
      <Header /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      
      <Footer />
    </div>
    
  </Router>
);

export default App;
