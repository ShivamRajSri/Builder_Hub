import React from "react";
import "./Searchresultfix.css"; 

export const SearchResult = ({ result, onClick }) => {
  return (
    <div className="search-result" onClick={() => onClick(result)}>
      {result.title}
    </div>
  );
};