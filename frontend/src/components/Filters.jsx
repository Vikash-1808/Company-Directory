import React from "react";
import logo from "../assets/logo.png";

const Filters = ({ filter, setFilter }) => {
  return (
       <div
  className="relative h-96 w-full bg-center bg-cover  brightness-90 contrast-110"
  style={{ backgroundImage: `url(${logo})` }}
>
   <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70"></div>
   
  <div className="relative z-10 flex  flex-wrap items-center justify-center gap-4 h-full px-4">
    <input
      type="text"
      placeholder="Search by name"
      className="border p-2 rounded  text-white h-[50px] w-full sm:w-[200px]"
      value={filter.name}
      onChange={(e) => setFilter({ ...filter, name: e.target.value })}
    />
    <input
      type="text"
      placeholder="Location"
      className="border p-2 rounded text-white h-[50px] w-full sm:w-[200px]"
      value={filter.location}
      onChange={(e) => setFilter({ ...filter, location: e.target.value })}
    />
    <input
      type="text"
      placeholder="Industry"
      className="border p-2 rounded text-white h-[50px] w-full sm:w-[200px]"
      value={filter.industry}
      onChange={(e) => setFilter({ ...filter, industry: e.target.value })}
    />
  </div>
</div>
  );
};

export default Filters;
