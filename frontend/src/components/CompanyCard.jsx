import React from "react";



function CompanyCard(props) {
  const company = props.company;

  return (
   <div
  className=" p-4 rounded-2xl h-[220px] mx-6 shadow-md mb-4  bg-white hover:shadow-2xl hover:scale-[1.03]  transition-all duration-300 ease-in-out transform cursor-pointer"
>
  <h3 className="text-xl font-semibold text-gray-800 mb-4 tracking-wide">
    {company.name} </h3>

  <p className="text-gray-600 text-sm mb-1">
    <span className="font-medium text-gray-700">Location:</span> {company.location}
  </p>
  <p className="text-gray-600 text-sm mb-1">
    <span className="font-medium text-gray-700">Industry:</span> {company.industry}
  </p>
  <p className="text-gray-600 text-sm mb-1">
    <span className="font-medium text-gray-700">Size:</span> {company.size}
  </p>
  <p className="text-gray-700 text-sm mt-2 line-clamp-2">
    {company.description}
  </p>
</div>

    
  );
}

export default CompanyCard;

