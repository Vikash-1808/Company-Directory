import React, { useState } from "react";
import { companies } from "../DataApi/companies";
import CompanyCard from "../components/CompanyCard";
import Filters from "../components/Filters";
import { Link } from "react-router-dom";


const Home = () => {
  const [filter, setFilter] = useState({ name: "", location: "", industry: "" });


  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      c.location.toLowerCase().includes(filter.location.toLowerCase()) &&
      c.industry.toLowerCase().includes(filter.industry.toLowerCase())
  );


  const featuredCompanies = filteredCompanies.slice(0, 3);

  return (
    <main className="bg-gray-100 ">
     
      <div className=" ">
        <Filters filter={filter} setFilter={setFilter} />
      </div>

     
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Featured Companies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCompanies.length > 0 ? (
            featuredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))) : (  <p className="text-gray-600">No companies found.</p>)}
        </div>

       
        {/* <div className="text-center mt-6">
          <a  href="/jobs"  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition" >  View All Companies →</a>
        </div> */}
        <div className="text-center mt-6">
  <Link 
    to="/jobs"
    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
  >
    View All Companies →
  </Link>
</div>
      </div>

    </main>
  );
};

export default Home;
