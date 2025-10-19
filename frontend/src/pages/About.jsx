import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-12">

        
        <div className="md:w-1/2">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            About Company Directory
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Company Directory is a modern job finder platform that connects job seekers with the companies of their dreams.  
            Explore top organizations, browse their profiles, and discover the latest career opportunities across industries.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Built with <span className="font-semibold text-blue-600">React.js</span> and <span className="font-semibold text-blue-600">Tailwind CSS</span>, our app is fully responsive, fast, and user-friendly.  
            Filter companies by name, location, or industry, and get detailed insights about each organization.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you are a fresh graduate or an experienced professional, Company Directory makes your job search simple, transparent, and effective.
          </p>
        </div>

        <div className="md:w-1/2 flex flex-col space-y-6">
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2"> Explore Companies</h3>
            <p className="text-gray-600 text-sm">
              Browse through hundreds of companies, view their profiles, and get information about location, industry, size, and more.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2"> Search & Filter</h3>
            <p className="text-gray-600 text-sm">
              Quickly find companies that match your career goals by filtering by name, industry, or location.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2"> Latest Job Openings</h3>
            <p className="text-gray-600 text-sm">
              Stay updated with featured companies and latest job postings. Apply with confidence knowing you have the right information.
            </p>
          </div>
        </div>

      </div>

     
    </div>
  );
};

export default About;
