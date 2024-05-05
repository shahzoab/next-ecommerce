import "@testing-library/jest-dom";
import axios from "axios";
import { render, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PRODUCTS_API_URL } from "@/app/lib/config";
import { useStore } from "@/app/lib/store";
import Home from "@/app/page";

jest.mock("axios");

/**
 * Collection of tests for the Home component.
 */
describe("Home", () => {
  const user = userEvent.setup();

  /**
   * Test that an error is thrown when fetching products.
   */
  test("error is thrown when fetching products", async () => {
    // Mock the axios get method to reject with an error
    axios.get.mockRejectedValue({ message: "Something went wrong" });

    // Render the Home component
    const { getByText } = render(<Home />);

    // Wait for the axios get method to be called with the correct URL
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(PRODUCTS_API_URL);
    });

    // Check that the error message is displayed
    expect(getByText("Something went wrong")).toBeInTheDocument();
  });

  /**
   * Test that products are fetched successfully and displayed.
   */
  test("products are fetched successfully and displayed", async () => {
    const responseData = [
      {
        id: 1,
        colour: "Black",
        name: "Black Sheet Strappy Textured Glitter Bodycon Dress",
        price: 10,
        img: "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024",
      },
      {
        id: 2,
        colour: "Stone",
        name: "Stone Ribbed Strappy Cut Out Detail Bodycon Dress",
        price: 4,
        img: "https://cdn-img.prettylittlething.com/3/6/5/a/365a5d1dce6a2b77b564379b302c9d83afccf33b_cmd2051_1.jpg?imwidth=1024",
      },
      {
        id: 3,
        colour: "Black",
        name: "Black Frill Tie Shoulder Bodycon Dress",
        price: 7.99,
        img: "https://cdn-img.prettylittlething.com/d/c/3/3/dc337260f9ecefdb99a8c8e98cd73ccb1b79cea5_cmb6804_4.jpg?imwidth=1024",
      },
      {
        id: 5,
        colour: "Red",
        name: "Red Pin Stripe Belt T Shirt Dress",
        price: 17,
        img: "https://cdn-img.prettylittlething.com/f/7/1/8/f718a4011ddf92f48aeefff6da0f475178694599_cly0842_1.jpg?imwidth=1024",
      },
    ];
    // Mock the axios get method to resolve with the response data
    axios.get.mockResolvedValue({ data: responseData });

    // Render the Home component
    const { getByText } = render(<Home />);

    // Wait for the axios get method to be called with the correct URL
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(PRODUCTS_API_URL);
    });

    // Check that the first product is displayed
    expect(getByText("Black Sheet Strappy Textured Glitter Bodycon Dress")).toBeInTheDocument();
    // Check that the second product is displayed
    expect(getByText("Stone Ribbed Strappy Cut Out Detail Bodycon Dress")).toBeInTheDocument();
  });

  /**
   * Test that the quantity and total price are updated correctly.
   */
  test("quantity and total price are updated correctly", async () => {
    // Spy on the increaseQuantity, decreaseQuantity, and resetQuantity methods of the store state
    const increaseSpy = jest.spyOn(useStore.getState(), "increaseQuantity");
    const decreaseSpy = jest.spyOn(useStore.getState(), "decreaseQuantity");
    const resetSpy = jest.spyOn(useStore.getState(), "resetQuantity");

    // Render the Home component
    const { getByTestId } = render(<Home />);

    // Wait for the axios get method to be called with the correct URL
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(PRODUCTS_API_URL);
    });

    // Get the total price element
    const totalPrice = getByTestId("total-price");

    // Click the increase quantity button twice
    await act(async () => {
      await user.click(await getByTestId("increase-quantity-1"));
      await user.click(await getByTestId("increase-quantity-1"));
    });

    // Check that the increaseQuantity method was called
    expect(increaseSpy).toHaveBeenCalled();

    // Wait for the total price to update to 20.00
    await waitFor(() => {
      expect(totalPrice).toHaveTextContent("20.00");
    });

    // Click the decrease quantity button once
    await act(async () => {
      await user.click(await getByTestId("decrease-quantity-1"));
    });

    // Check that the decreaseQuantity method was called
    expect(decreaseSpy).toHaveBeenCalled();

    // Check that the total price updated to 10.00
    expect(totalPrice).toHaveTextContent("10.00");

    // Click the reset quantity button once
    await act(async () => {
      await user.click(await getByTestId("reset-quantity-1"));
    });

    // Check that the resetQuantity method was called
    expect(resetSpy).toHaveBeenCalled();

    // Check that the total price updated to 0.00
    expect(totalPrice).toHaveTextContent("0.00");
  });

  /**
   * Test that products are filtered based on selected color.
   */
  test("products are filtered based on selected color", async () => {
    // Render the Home component
    const { getByTestId } = render(<Home />);

    // Wait for the axios get method to be called with the correct URL
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(PRODUCTS_API_URL);
    });

    // Get the color select element
    const colorSelect = getByTestId("color-select");

    // Click the color select element
    await act(async () => {
      await user.click(colorSelect);
    });

    // Get the color black element
    const colorBlack = getByTestId("color-Black");

    // Click the color black element
    await act(async () => {
      await user.click(colorBlack);
    });

    // Check that the "Stone Ribbed" product is not displayed
    expect(getByTestId("products-list")).not.toHaveTextContent(
      "Stone Ribbed Strappy Cut Out Detail Bodycon Dress"
    );
  });
});
