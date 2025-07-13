import React, { useState, useEffect, useRef } from "react";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import { Card, CardContent } from "../Components/Card";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`http://localhost:3000/seller/materials?page=${page}&limit=9`);
      const data = await res.json();

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setProducts((prev) => [...prev, ...data]);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore]);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Get Your Building Material at the Lowest Cost
          </h1>
          <p className="mb-6">Buy or Sell Building Materials at Your Desired Cost</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Input placeholder="Search Your Building Material" className="w-full sm:w-96" />
            <Button>Search</Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Building Materials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product._id}>
                <img
                  src={product.images?.[0]} // ✅ Access the first image from images array
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

          {hasMore && (
            <div ref={loaderRef} className="text-center py-10 text-gray-500">
              Loading more...
            </div>
          )}
        </div>
      </section>
    </div>
  );
}