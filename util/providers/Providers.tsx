import { ThemeProvider } from "@mui/material";
import * as React from "react";
import QueryClientProvider from "./QueryClient";
import theme from "../theme";

export interface IProvidersProps {
  children: React.ReactNode;
}

export function Providers(props: IProvidersProps) {
  return (
    <QueryClientProvider>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </QueryClientProvider>
  );
}
