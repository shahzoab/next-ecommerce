"use client";

import React from "react";
import { useStore } from "@/app/lib/store";
import { CURRENCY_SYMBOL } from "@/app/lib/config";

/**
 * TotalPrice component displays the total price of the products in the cart.
 */
const TotalPrice = () => {
  // Access the products from the store
  const products = useStore((state) => state.products);

  // Calculate the total price by iterating over the products
  // and multiplying the price with the quantity if it's greater than 0
  const totalPrice = products
    .reduce((acc, product) => {
      if (product.quantity > 0) {
        return acc + product.price * product.quantity;
      }
      return acc;
    }, 0)
    .toFixed(2);

  return (
    <div className="mt-10 flex justify-start text-xl sm:justify-end">
      Total Price: {CURRENCY_SYMBOL}
      <span data-testid="total-price">{totalPrice}</span>
    </div>
  );
};

export default TotalPrice;
