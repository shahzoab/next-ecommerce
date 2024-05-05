import { create } from "zustand";
import { ProductType } from "@/app/lib/types";

// Type definition for the store
type Store = {
  products: ProductType[]; // Array of products
  setProducts: (products: ProductType[]) => void; // Function to set the products in the store
  selectedColor: string; // Selected color from the store
  setSelectedColor: (color: string) => void; // Function to set the selected color in the store
  increaseQuantity: (id: number) => void; // Function to increase the quantity of a product in the store
  decreaseQuantity: (id: number) => void; // Function to decrease the quantity of a product in the store
  resetQuantity: (id: number) => void; // Function to reset the quantity of a product in the store
};

/**
 * Create a store using zustand.
 * The store contains the products, selected color and functions to update the state.
 */
export const useStore = create<Store>()((set) => ({
  // Initial state of the store
  products: [], // Empty array of products
  /**
   * Function to set the products in the store
   * @param products - The array of products
   */
  setProducts: (products: ProductType[]) => set({ products }),
  selectedColor: "", // Empty string for the selected color
  /**
   * Function to set the selected color in the store
   * @param color - The selected color
   */
  setSelectedColor: (color: string) => set({ selectedColor: color }),
  /**
   * Function to increase the quantity of a product in the store.
   * @param id - The id of the product
   */
  increaseQuantity: (id: number) =>
    set((state) => {
      const updatedProducts = state.products.map((product) => {
        if (product.id === id) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      return { products: updatedProducts };
    }),
  /**
   * Function to decrease the quantity of a product in the store.
   * @param id - The id of the product
   */
  decreaseQuantity: (id: number) =>
    set((state) => {
      const updatedProducts = state.products.map((product) => {
        if (product.id === id) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      return { products: updatedProducts };
    }),
  /**
   * Function to reset the quantity of a product in the store.
   * @param id - The id of the product
   */
  resetQuantity: (id: number) =>
    set((state) => {
      const updatedProducts = state.products.map((product) => {
        if (product.id === id) {
          return { ...product, quantity: 0 };
        }
        return product;
      });
      return { products: updatedProducts };
    }),
}));
