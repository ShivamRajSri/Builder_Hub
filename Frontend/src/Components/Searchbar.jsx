import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Serachbarfix.css";

export const SearchBar = ({ setResults, onSelect }) => {
  const [input, setInput] = useState("");

  const fetchData = async (value) => {
    setInput(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/seller/materials?search=${value}`);
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Error fetching search results:", err);
      setResults([]);
    }
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Search your building material..."
        value={input}
        onChange={(e) => fetchData(e.target.value)}
      />
    </div>
  );
};