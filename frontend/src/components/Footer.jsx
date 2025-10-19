import React from "react";

import { FaSquareXTwitter } from "react-icons/fa6";
import { RiFacebookBoxFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {

  return (
    <footer className="bg-black text-white px-20 py-12">
  <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-10">


    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Company Directory</h2>
      <p className="text-gray-400 max-w-xs">
        We are connecting job seekers with their ideal career opportunities. With Company Directory, finding the perfect job has never been easier.
      </p>

      <p >
     
      <FaSquareInstagram className=" w-[30px] h-[30px] mx-3 mt-3  inline"/>
      <FaSquareXTwitter className= " w-[30px] h-[30px] mx-3 mt-3  inline"/>
     <RiFacebookBoxFill className="w-[30px] h-[30px]  mx-3 mt-3  inline"/>
     <FaLinkedin className=" w-[30px] h-[30px] mx-3  mt-3   inline" />
     
     </p>

    </div>

   
    <div className="grid grid-cols-2 gap-8 md:grid-cols-2">
    
      <div className="flex flex-col space-y-2">
        <h3 className="font-semibold text-lg">Company</h3>
        <a href="#" className="text-gray-400 hover:text-white transition">About Us</a>
        <a href="#" className="text-gray-400 hover:text-white transition">For Jobseekers</a>
        <a href="#" className="text-gray-400 hover:text-white transition">Cookies Policy</a>
      </div>

      <div className="flex flex-col space-y-2">
        <h3 className="font-semibold text-lg">Business</h3>
        <a href="#" className="text-gray-400 hover:text-white transition">For Employers</a>
        <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
        <a href="#" className="text-gray-400 hover:text-white transition">Blogs</a>
      </div>
    </div>

  </div>


  <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
    &copy; 2025 Company Directory. All rights reserved.
  </div>
</footer>

  );
};

export default Footer;
