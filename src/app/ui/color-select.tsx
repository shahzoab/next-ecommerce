"use client";

import React from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { useStore } from "@/app/lib/store";

/**
 * ColorSelect component renders a Select component to allow the user to select a color.
 * The list of colors is extracted from the list of products in the store.
 * The selected color is stored in the store and can be updated by the user.
 */
const ColorSelect: React.FC = () => {
  // Get the list of products from the store
  const products = useStore((state) => state.products);

  // Extract the unique colors from the list of products
  const colors = products
    .map((product) => product.colour)
    .filter((color, index, self) => self.indexOf(color) === index);

  // Get the selected color from the store
  const selectedColor = useStore((state) => state.selectedColor);

  // Function to update the selected color in the store
  const setSelectedColor = useStore((state) => state.setSelectedColor);

  return (
    <Select
      value={selectedColor}
      onChange={(e) => setSelectedColor(e.target.value)}
      isDisabled={colors.length === 0}
      className="mb-5 w-60"
      data-testid="color-select"
      label="Select a color"
    >
      {colors.map((color) => (
        <SelectItem key={color} value={color} data-testid={`color-${color}`}>
          {color}
        </SelectItem>
      ))}
    </Select>
  );
};

export default ColorSelect;
