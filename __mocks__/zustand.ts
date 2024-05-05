import * as zustand from "zustand";
import { act } from "@testing-library/react";

// Import the actual zustand library so we can mock its functionality
const { create: actualCreate, createStore: actualCreateStore } =
  jest.requireActual<typeof zustand>("zustand");

// Variable to hold reset functions for all stores declared in the app
export const storeResetFns = new Set<() => void>();

/**
 * Mock zustand's create function.
 * When creating a store, we get its initial state, create a reset function and add it in the set.
 */
export const create = (<T>() => {
  // Log a message to help with debugging
  console.log("zustand create mock");

  // Return a new store with a reset function added to the set
  return (stateCreator: zustand.StateCreator<T>) => {
    const store = actualCreate(stateCreator);
    const initialState = store.getState();
    storeResetFns.add(() => {
      store.setState(initialState, true);
    });
    return store;
  };
}) as typeof zustand.create;

/**
 * Mock zustand's createStore function.
 * When creating a store, we get its initial state, create a reset function and add it in the set.
 */
export const createStore = (<T>(stateCreator: zustand.StateCreator<T>) => {
  // Log a message to help with debugging
  console.log("zustand createStore mock");

  // Return a new store with a reset function added to the set
  const store = actualCreateStore(stateCreator);
  const initialState = store.getState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
}) as typeof zustand.createStore;

/**
 * After each test run, reset all stores by calling their reset functions.
 */
afterEach(() => {
  // Use act to ensure the state updates are synchronous
  act(() => {
    // Call each store's reset function
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
});
