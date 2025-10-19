import React from "react";
import { companies } from "../DataApi/companies";
import CompanyCard from "../components/CompanyCard";

const Jobs = () => (
  <div className="bg-gray-200 p-6">
   
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  </div>
);

export default Jobs;
