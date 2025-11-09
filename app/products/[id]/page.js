"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { button } from "reactstrap";
import { useRouter} from "next/navigation";

function formatStars(score) {
  if (!score) score = 0;

  if (score > 5) score = 5;
  if (score < 0) score = 0;

  let stars = "★".repeat(score);
  stars += "☆".repeat(5 - score);

  return stars;
}

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;
  const [product, setProduct] = useState({});

  const getProductById = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      const data = await response.json();
      setProduct(data);

    } catch (error) {
      setProduct({});
    }
  };

  useEffect(() => {
    getProductById();
  }, []);
  
  return (
    <div className="flex flex-column h-auto justify-center gap-4 m-auto p-[1rem] max-w-[600px]">

      <p className="text-2xl font-bold text-center">Details</p>
      <div
        className="flex flex-column items-center">
        <img src={product.thumbnail} alt={product.title} className="h-[200px]" />
        <p className="text-[24px] text-center font-bold">{product.title}</p>
        <p className="text-[16px] text-center">Description: {product.description}</p>
        <p className="text-[18px] text-center">Price: ${product.price}</p>

        {(Array.isArray(product.reviews) && product.reviews.length > 0) && (
          <div className="w-full">
            <p className="text-xl font-semibold">Reviews:</p>
            <div className="flex flex-col gap-3 mt-2">
              {product.reviews.map((item, index) => (
                <div key={index} className="border p-4 rounded-xl shadow-lg border-grey-200">
                  <div className="justify-between flex item-center">
                    <span className="text-[18px] font-bold self-start">{item.reviewerName}</span>
                    <span className="text-yellow-500 text-[16px] text-sm">{formatStars(item.rating)} ({item.rating})</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] italic mt-1">{item.comment}</span>
                    <span className="text-[12px] text-gray-500 mt-10">{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center w-full">
        <button className="bg-blue-500 text-white py-2 px-20 rounded mt-4"
          onClick={() => router.push('/')}
        >Back</button>
      </div>
    </div>
  );
}
