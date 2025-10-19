// import React from 'react'

// const CompaniesFinder = () => {
//   return (
//     <div>CompaniesFinder</div>
//   )
// }

// export default CompaniesFinder


// CompaniesFinder.jsx
// Single-file React component (default export) designed for Vite + Tailwind projects.
// Features:
// - Fetch companies from an API (VITE_API_BASE_URL or /api/companies)
// - Search (debounced), filter by industry and location, sort, pagination
// - Responsive card + table view, loading and error states
// - Tailwind CSS utility classes used throughout

import React, { useEffect, useMemo, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const COMPANIES_ENDPOINT = `${BASE_URL}/companies`;

// Utility: debounce hook
function useDebounced(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function CompaniesFinder() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // UI state
  const [view, setView] = useState("cards"); // 'cards' or 'table'
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounced(query, 350);
  const [industry, setIndustry] = useState("All");
  const [location, setLocation] = useState("All");
  const [sortBy, setSortBy] = useState("name_asc");

  // Pagination
  const [page, setPage] = useState(1);
  const perPage = 8;

  // Fetch companies from API (simple GET) — supports optional query params
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (debouncedQuery) params.set("q", debouncedQuery);
        if (industry && industry !== "All") params.set("industry", industry);
        if (location && location !== "All") params.set("location", location);
        if (sortBy) params.set("sort", sortBy);
        params.set("page", String(page));
        params.set("per_page", String(perPage));

        const url = `${COMPANIES_ENDPOINT}?${params.toString()}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          // Expecting { items: [...], total: number }
          setCompanies(data.items || data);
        }
      } catch (err) {
        console.warn(err);
        if (!cancelled) {
          setError(err.message || "Failed to load companies");
          // fallback: local mock data so the UI stays interactive
          setCompanies(mockCompanies.slice(0, perPage));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => (cancelled = true);
  }, [debouncedQuery, industry, location, sortBy, page]);

  // Extract unique industries and locations from loaded companies for filter dropdowns
  const industries = useMemo(() => {
    const set = new Set(["All"]);
    mockCompanies.forEach((c) => c.industry && set.add(c.industry));
    companies.forEach((c) => c.industry && set.add(c.industry));
    return Array.from(set).sort();
  }, [companies]);

  const locations = useMemo(() => {
    const set = new Set(["All"]);
    mockCompanies.forEach((c) => c.location && set.add(c.location));
    companies.forEach((c) => c.location && set.add(c.location));
    return Array.from(set).sort();
  }, [companies]);

  // Client-side derived list (if API returned full list). If API already paginates, this keeps UI predictable.
  const filtered = useMemo(() => {
    let list = companies.slice();
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.description || "").toLowerCase().includes(q) ||
          (c.industry || "").toLowerCase().includes(q)
      );
    }
    if (industry !== "All") list = list.filter((c) => c.industry === industry);
    if (location !== "All") list = list.filter((c) => c.location === location);

    if (sortBy === "name_asc") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "name_desc") list.sort((a, b) => b.name.localeCompare(a.name));
    if (sortBy === "employees_desc") list.sort((a, b) => (b.employees || 0) - (a.employees || 0));
    if (sortBy === "employees_asc") list.sort((a, b) => (a.employees || 0) - (b.employees || 0));

    return list;
  }, [companies, debouncedQuery, industry, location, sortBy]);

  const total = Math.max(filtered.length, companies.length);
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => setPage(1), [debouncedQuery, industry, location, sortBy]);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Companies Finder</h1>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setView((v) => (v === "cards" ? "table" : "cards"))}
              className="px-3 py-1 rounded-md border"
            >
              Toggle view
            </button>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-sm text-gray-500"
            >
              {COMPANIES_ENDPOINT}
            </a>
          </div>
        </header>

        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="flex-1">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search companies, industry, description..."
                className="w-full border rounded-md p-2"
              />
            </div>

            <div className="flex gap-2">
              <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="border rounded-md p-2">
                {industries.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>

              <select value={location} onChange={(e) => setLocation(e.target.value)} className="border rounded-md p-2">
                {locations.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>

              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded-md p-2">
                <option value="name_asc">Name A–Z</option>
                <option value="name_desc">Name Z–A</option>
                <option value="employees_desc">Most employees</option>
                <option value="employees_asc">Fewest employees</option>
              </select>
            </div>
          </div>
        </div>

        <main>
          {loading && (
            <div className="text-center py-8">Loading companies...</div>
          )}

          {error && (
            <div className="text-center py-4 text-red-600">{error}</div>
          )}

          {!loading && pageItems.length === 0 && (
            <div className="text-center py-12 text-gray-600">No companies found.</div>
          )}

          {!loading && pageItems.length > 0 && (
            <div>
              {view === "cards" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pageItems.map((c) => (
                    <CompanyCard key={c.id} company={c} />
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto bg-white rounded-md shadow-sm">
                  <table className="min-w-full table-auto">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="text-left p-3">Name</th>
                        <th className="text-left p-3">Industry</th>
                        <th className="text-left p-3">Location</th>
                        <th className="text-right p-3">Employees</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageItems.map((c) => (
                        <tr key={c.id} className="border-t">
                          <td className="p-3">
                            <div className="font-medium">{c.name}</div>
                            <div className="text-sm text-gray-500">{c.website}</div>
                          </td>
                          <td className="p-3">{c.industry}</td>
                          <td className="p-3">{c.location}</td>
                          <td className="p-3 text-right">{c.employees ?? "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            </div>
          )}
        </main>

        <footer className="mt-8 text-sm text-gray-500">Tip: point VITE_API_BASE_URL to your backend or skip it to use a local mock.</footer>
      </div>
    </div>
  );
}

function CompanyCard({ company }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col h-full">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center text-xl font-semibold">{(company.name || "?")[0]}</div>
        <div className="flex-1">
          <div className="font-semibold text-lg">{company.name}</div>
          <div className="text-sm text-gray-500">{company.industry} • {company.location}</div>
        </div>
        <div className="text-sm text-gray-400">{company.employees ?? "—"}</div>
      </div>

      <p className="text-sm text-gray-600 mt-3 flex-1">{company.description ?? "No description."}</p>

      <div className="mt-3 flex items-center justify-between">
        <a href={company.website || "#"} target="_blank" rel="noreferrer" className="text-sm underline">
          Visit
        </a>
        <div className="text-xs text-gray-400">Founded: {company.founded ?? "—"}</div>
      </div>
    </div>
  );
}

function Pagination({ page, setPage, totalPages }) {
  function go(p) {
    if (p < 1) p = 1;
    if (p > totalPages) p = totalPages;
    setPage(p);
  }
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <button className="px-3 py-1 border rounded" onClick={() => go(page - 1)} disabled={page === 1}>
        Prev
      </button>
      <div className="text-sm">Page {page} of {totalPages}</div>
      <button className="px-3 py-1 border rounded" onClick={() => go(page + 1)} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
}

// --- Mock data used as a fallback so the UI is usable without a backend ---
const mockCompanies = [
  { id: 1, name: "Astra Labs", industry: "Software", location: "Bengaluru, India", employees: 120, website: "https://astralabs.example", description: "Cloud-first product engineering.", founded: 2016 },
  { id: 2, name: "GreenFoods Pvt Ltd", industry: "Food & Beverage", location: "Mumbai, India", employees: 85, website: "https://greenfoods.example", description: "Organic food distribution.", founded: 2012 },
  { id: 3, name: "Helio Motors", industry: "Automotive", location: "Chennai, India", employees: 350, website: "https://heliomotors.example", description: "Electric vehicle components.", founded: 2018 },
  { id: 4, name: "Nova Health", industry: "Healthcare", location: "Delhi, India", employees: 200, website: "https://novahealth.example", description: "Telemedicine and diagnostics.", founded: 2014 },
  { id: 5, name: "ByteBridge", industry: "Software", location: "Pune, India", employees: 45, website: "https://bytebridge.example", description: "Mobile-first apps.", founded: 2020 },
  { id: 6, name: "AquaPure", industry: "Environment", location: "Hyderabad, India", employees: 60, website: "https://aquapure.example", description: "Water filtration solutions.", founded: 2011 },
  { id: 7, name: "FinStack", industry: "FinTech", location: "Bengaluru, India", employees: 500, website: "https://finstack.example", description: "Payments infrastructure.", founded: 2015 },
  { id: 8, name: "Orbit Analytics", industry: "Analytics", location: "Kolkata, India", employees: 30, website: "https://orbitanalytics.example", description: "Retail analytics for small businesses.", founded: 2019 },
  { id: 9, name: "SolarWave", industry: "Energy", location: "Jaipur, India", employees: 95, website: "https://solarwave.example", description: "Solar installations and finance.", founded: 2013 },
  { id: 10, name: "EduNext", industry: "EdTech", location: "Noida, India", employees: 210, website: "https://edunext.example", description: "Adaptive learning platforms.", founded: 2017 }
];

// End of file
