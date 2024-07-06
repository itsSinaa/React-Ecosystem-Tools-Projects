import React, { useEffect, useState } from "react";
import Container from "../../components/container/Container";
import StoreItem from "../../components/store-item/StoreItem";
import { getAllProducts } from "../../services/api";
import { Product } from "../../types/types";
import { Link } from "react-router-dom";

const Store = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts().then((result) => setProducts(result));
  }, []);

  return (
    <Container>
      <h3 className="text-right my-5">جدید ترین محصولات</h3>
      <div className="grid grid-cols-4 gap-5">
        {products.map((product) => {
          return (
            <Link key={product.id} to={`/product/${product.id}`}>
              <StoreItem {...product} />
            </Link>
          );
        })}
      </div>
    </Container>
  );
};

export default Store;
