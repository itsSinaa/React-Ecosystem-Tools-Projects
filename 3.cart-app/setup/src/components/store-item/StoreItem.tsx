import React from "react";
import { Product } from "../../types/types";

const StoreItem = ({ image, title, price, description }: Product) => {
  return (
    <div className="flex flex-col gap-3 shadow p-4 rounded border">
      <img src={image} alt="feature-product" />
      <div className="flex items-center justify-between">
        <p className="line-clamp-1 w-52 font-medium">{title}</p>
        <span>{price.toLocaleString()}$</span>
      </div>
      <p className="line-clamp-2 text-gray-500">{description}</p>
    </div>
  );
};

export default StoreItem;
