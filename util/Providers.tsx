import { ThemeProvider } from "@mui/material";
import * as React from "react";
import theme from "./theme";

export interface IProvidersProps {
  children: React.ReactNode;
}

export function Providers(props: IProvidersProps) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
