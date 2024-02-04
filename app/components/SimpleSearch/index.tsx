"use-client";

import React from "react";
import SimpleSearch, { SimpleSearchProps } from "./SimpleSearch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const index: React.FC<SimpleSearchProps> = (props) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SimpleSearch {...props} />
    </QueryClientProvider>
  );
};

export default index;
