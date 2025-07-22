import "./searchlistfix.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results, onSelect }) => {
  return (
    <div className="results-list">
      {results.map((result) => (
        <SearchResult
          key={result._id}
          result={result}         
          onClick={onSelect}    
        />
      ))}
    </div>
  );
};
