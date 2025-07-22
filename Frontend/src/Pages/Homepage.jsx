import React, { useState, useEffect, useRef, useCallback } from "react";
import { SearchBar } from "../Components/Searchbar";
import { SearchResult } from "../Components/SearchResult";
import { Button } from "../Components/Button";
import { Card, CardContent } from "../Components/Card";
import { Loader2 } from "lucide-react";
import { SearchResultsList } from "../Components/Searchlist"; 
export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);
  const observer = useRef(null);
  const LIMIT = 6;

  const fetchProducts = useCallback(async ({ reset = false, pageNum = 1 }) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/seller/materials?page=${pageNum}&limit=${LIMIT}`);
      const data = await res.json();

      if (reset) {
        setProducts(data);
      } else {
        setProducts((prev) => [...prev, ...data]);
      }

      setHasMore(data.length === LIMIT);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!searching) fetchProducts({ pageNum: page });
  }, [page, fetchProducts, searching]);

  useEffect(() => {
    if (loading || !hasMore || searching) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setPage((prev) => prev + 1);
    }, { threshold: 1.0 });

    if (loaderRef.current) observer.current.observe(loaderRef.current);

    return () => observer.current?.disconnect();
  }, [loading, hasMore, searching]);

  const handleSelectResult = (product) => {
    setProducts([product]);
    setSearchResults([]);
    setSearching(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Get Your Building Material at the Lowest Cost
          </h1>
          <p className="mb-6">
            Buy or Sell Building Materials at Your Desired Cost
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative">
            <SearchBar setResults={setSearchResults} onSelect={handleSelectResult} />
         {searchResults.length > 0 && (
  <div className="absolute top-full mt-1 bg-white shadow-lg rounded w-full max-w-md z-50">
     <SearchResultsList
      results={searchResults}
      onSelect={handleSelectResult}
     />
     </div>
    )}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Building Materials</h2>

          {products.length === 0 && !loading && (
            <div className="text-center text-gray-500">No products found.</div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
<Card key={product._id} className="h-full">
  <div className="flex-grow">
    <img
      src={product.images?.[0] || "https://via.placeholder.com/400x250.png?text=No+Image"}
      alt={product.title}
      className="w-full h-full object-cover"
    />
  </div>
  <CardContent>
    <h3 className="text-lg font-semibold">{product.title}</h3>
    <p className="text-blue-600 font-bold mt-2">{product.price}</p>
    <Button className="mt-4 w-full">View Details</Button>
  </CardContent>
</Card>
            ))}
          </div>

          {loading && (
            <div className="text-center py-10 text-gray-500">Loading more products...</div>
          )}

          {!loading && !hasMore && products.length > 0 && (
            <div className="text-center py-10 text-gray-500">
              🎉 You've reached the end of the list.
            </div>
          )}

          <div ref={loaderRef}></div>
        </div>
      </section>
    </div>
  );
}