"use client";

import React from "react";
import { useStore } from "@/app/lib/store";
import Product from "@/app/ui/product";

/**
 * ProductsList component renders a list of Product components.
 * The list of products is extracted from the store.
 * The list is filtered based on the selected color from the store.
 */
const ProductsList: React.FC = () => {
  // Extract the selected color from the store
  const selectedColor = useStore((state) => state.selectedColor);
  // Extract the list of products from the store
  const products = useStore((state) => state.products);
  // Filter the list of products based on the selected color
  const filteredProducts = products.filter((product) =>
    selectedColor ? product.colour === selectedColor : true
  );

  // Render the Product component for each filtered product
  // and pass the product as a prop to the Product component
  return (
    <div data-testid="products-list">
      {filteredProducts.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
