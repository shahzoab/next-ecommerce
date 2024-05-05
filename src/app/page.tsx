"use client";

import React from "react";
import useSWR from "swr";
import { fetcher } from "@/app/lib/utils";
import { Spinner } from "@nextui-org/react";
import { PRODUCTS_API_URL } from "@/app/lib/config";
import { useStore } from "@/app/lib/store";
import { ProductType } from "@/app/lib/types";
import ProductsList from "@/app/ui/products-list";
import ColorSelect from "@/app/ui/color-select";
import TotalPrice from "@/app/ui/total-price";

/**
 * Home component represents the home page of the application.
 * It fetches the data from the API, sets the products in the store,
 * and renders the UI components.
 */
const Home: React.FC = () => {
  // Fetch data from the API using SWR
  const { data, error, isLoading } = useSWR(PRODUCTS_API_URL, fetcher);

  // Function to set the products in the store
  const setProducts = useStore((state) => state.setProducts);

  // If there is an error or the data is empty, show an error message
  if (error || data?.length === 0) {
    return (
      <main className="flex h-screen w-full items-center justify-center px-10">
        <p className="text-3xl font-bold">Something went wrong</p>
      </main>
    );
  }

  // Map over the data and set the quantity to 0 for each product
  const products = data?.map((product: ProductType) => ({
    ...product,
    quantity: 0,
  }));

  // Set the products in the store
  setProducts(products);

  return (
    <main className="mx-auto max-w-screen-md p-10">
      {isLoading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <ColorSelect />
          <ProductsList />
          <TotalPrice />
        </>
      )}
    </main>
  );
};

export default Home;
