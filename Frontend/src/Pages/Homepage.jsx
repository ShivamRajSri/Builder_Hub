import React, { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import { Card, CardContent } from "../Components/Card";
import { Loader2, X } from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const LIMIT = 6;
  const loaderRef = useRef(null);
  const observer = useRef(null);

  const fetchProducts = useCallback(
    async ({ reset = false, query = "", pageNum = 1 }) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `http://localhost:3000/seller/materials?page=${pageNum}&limit=${LIMIT}${
            query ? `&search=${query}` : ""
          }`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();

        if (reset) {
          setProducts(data);
        } else {
          setProducts((prev) => [...prev, ...data]);
        }

        setHasMore(data.length === LIMIT);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchProducts({ pageNum: page });
  }, [page, fetchProducts]);

  useEffect(() => {
    if (loading || !hasMore || isSearching) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.current.observe(loaderRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading, hasMore, isSearching]);

  const handleSearch = () => {
    if (searchQuery.trim() === "") return;
    setIsSearching(true);
    setPage(1);
    fetchProducts({ reset: true, query: searchQuery.trim(), pageNum: 1 });
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setPage(1);
    fetchProducts({ reset: true, pageNum: 1 });
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Get Your Building Material at the Lowest Cost
          </h1>
          <p className="mb-6">Buy or Sell Building Materials at Your Desired Cost</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="relative w-full sm:w-96">
              <Input
                placeholder="Search Your Building Material"
                className="w-full pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {loading && (
                <Loader2 className="animate-spin absolute right-10 top-2.5 text-white w-5 h-5" />
              )}
              {isSearching && (
                <X
                  onClick={handleClearSearch}
                  className="absolute right-3 top-2.5 cursor-pointer text-white w-5 h-5"
                  title="Clear Search"
                />
              )}
            </div>
            <Button onClick={handleSearch} disabled={loading}>
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Building Materials</h2>

          {isSearching && searchQuery && (
            <div className="text-sm text-gray-700 mb-4">
              Showing results for: <span className="font-semibold">{searchQuery}</span>
            </div>
          )}

          {error && <div className="text-red-600 text-center mb-4">{error}</div>}
          {products.length === 0 && !loading && !error && (
            <div className="text-center text-gray-500">No products found.</div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product._id}>
                <img
                  src={
                    product.images?.[0] ||
                    "https://via.placeholder.com/400x250.png?text=No+Image"
                  }
                  alt={product.title}
                  className="rounded-t-xl w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-blue-600 font-bold mt-2">{product.price}</p>
                  <Button className="mt-4 w-full">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Scroll Loader + End Sign */}
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