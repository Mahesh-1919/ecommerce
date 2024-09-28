"use client";

import { Provider } from "react-redux";
import { store } from "../store/slice"; // Adjust path as necessary

function MyApp({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider store={store}>{children}</Provider>;
}

export default MyApp;
