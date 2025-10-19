import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white-600   mx-7  p-4 flex justify-between  ">
  
      <h1 className="text-3xl font-extrabold text-gray-900">
        Company <span className="text-blue-500">Directory</span>
      </h1>

      <nav className="hidden md:flex gap-4 pl-80">
      {["Home", "Jobs", "About"].map((item) => (
        <Link key={item} to={`/${item === "Home" ? "" : item.toLowerCase()}`} className="px-5 transition-all duration-300 hover:text-blue-600 hover:scale-110 hover:font-semibold" >
          {item} </Link> ))}
    </nav>

    <div className="hidden md:flex ml-auto">
      <Link to="/auth" className="px-4 transition-all duration-300 hover:text-blue-600 hover:scale-110 hover:font-semibold"  >
        <FaUser className="inline" /> <span className="text-sm">Sign In / Up</span>
      </Link>
    </div>



    
      <button className="md:hidden text-gray-800 text-3xl"
        onClick={() => setMenuOpen(!menuOpen)} >
        {menuOpen ? "✖" : "☰"} 
      </button>
      

    
      {menuOpen && (
        <nav className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center">
          {["Home", "Jobs", "About", "Login/Signup"].map((item) => (
            <Link key={item} to={`/${item === "Home" ? "" : item.toLowerCase().replace(" ", "")}`} onClick={() => setMenuOpen(false)}
              className="py-2 w-full text-center transition-all duration-300 hover:text-blue-600 hover:font-semibold" >
              {item}
            </Link>
          ))}
          
        </nav>
      )}
    
    </header>
  );
};

export default Header;
