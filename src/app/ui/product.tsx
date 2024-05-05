"use client";

import React from "react";
import clsx from "clsx";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { ProductType } from "@/app/lib/types";
import { useStore } from "@/app/lib/store";
import { CURRENCY_SYMBOL } from "@/app/lib/config";

/**
 * Component that represents a single product in the product listing.
 * It displays the product image, name, and price.
 * It also provides functionality to increase, decrease, and reset the product quantity.
 *
 * @prop {ProductType} product - The product object containing the product data.
 */
interface ProductProps {
  product: ProductType;
}
const Product: React.FC<ProductProps> = ({ product }) => {
  // Function to increase the quantity of a product in the store
  const increaseQuantity = useStore((state) => state.increaseQuantity);
  // Function to decrease the quantity of a product in the store
  const decreaseQuantity = useStore((state) => state.decreaseQuantity);
  // Function to reset the quantity of a product in the store
  const resetQuantity = useStore((state) => state.resetQuantity);

  return (
    <div className="flex flex-col justify-between border-b border-solid py-5 sm:flex-row">
      <div className="flex sm:w-3/4">
        <div className="mr-5 w-28">
          <Image src={product.img} alt={product.name} width={100} height={100} />
        </div>
        <div>
          <h2 className="mb-5 text-lg font-bold">{product.name}</h2>
          <p>
            {CURRENCY_SYMBOL}
            {product.price}
          </p>
        </div>
      </div>
      <div className="mt-5 flex justify-start sm:mt-0 sm:w-1/4 sm:justify-end">
        <div className="flex flex-col items-center">
          <div>
            {/* Button to decrease the quantity of the product */}
            <button
              className={clsx("mx-2 rounded bg-default px-2 py-1", {
                "cursor-not-allowed": product.quantity === 0,
              })}
              onClick={() => decreaseQuantity(product.id)}
              aria-label="Decrease Quantity"
              data-testid={`decrease-quantity-${product.id}`}
              disabled={product.quantity === 0}
            >
              -
            </button>
            {/* Display the current quantity of the product */}
            <span data-testid={`quantity-${product.id}`} className="inline-block w-7 text-center">
              {product.quantity}
            </span>
            {/* Button to increase the quantity of the product */}
            <button
              className="mx-2 rounded bg-default px-2 py-1"
              onClick={() => increaseQuantity(product.id)}
              aria-label="Increase Quantity"
              data-testid={`increase-quantity-${product.id}`}
            >
              +
            </button>
          </div>
          {/* Button to reset the quantity of the product */}
          <Button
            size="sm"
            className="mt-5"
            onClick={() => resetQuantity(product.id)}
            data-testid={`reset-quantity-${product.id}`}
            aria-label="Remove"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
