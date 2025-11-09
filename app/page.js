"use client";

import React from "react";
import Header from "../components/Header";
import FormComponent from "@/components/FormComponent";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filtersProduct, setFiltersProduct] = useState([]);

  const getAllProducts = async () => {
  try {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) throw new Error("Failed to fetch products");

      const allProduct = await response.json();
      setProducts(allProduct.products);
      setFiltersProduct(allProduct.products);
      console.log('-allProducts-' , allProduct.products , allProduct.limit);

    } catch (error) {
      setProducts([]);
      setFiltersProduct([]);
      console.error("Error fetching products:", error);
  }
  
};

console.log('-products-' , products);
console.log('-filtersProduct-' , filtersProduct);

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleSearch = (text) => {
    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFiltersProduct(filtered);
  };

  return (
    <div>
      <Header />
      <FormComponent onSearch={handleSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-10">
        {filtersProduct.map((item) => (
          <div 
            key={item.id}
            className="border p-4 rounded-lg shadow-lg flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
            onClick={() => router.push(`/products/${item.id}`)}
          >
            <img src={item.thumbnail} alt={item.name} />
            <p className="text-[22px] text-center font-bold">{item.title}</p>
            <p className="text-[18px] text-center">Price: ${item.price}</p>

            <div className="flex gap-2 mt-4">
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Editing ${item.title}`);
                }}
              >
                Edit
              </button>
              <button 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Deleted ${item.title} from cart`);
                }}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );``
}
