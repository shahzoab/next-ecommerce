"use client";

import React from "react";
import { NextUIProvider } from "@nextui-org/react";

/**
 * Providers component wraps its children with the NextUIProvider from
 * @nextui-org/react, which provides the necessary context for Next UI
 * components to work properly.
 */
interface ProvidersProps {
  children: React.ReactNode;
}
const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Providers;
