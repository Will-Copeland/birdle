import { Skeleton } from "@mui/material";
import React from "react";

const LoadingPage: React.FC = () => {
  return (
    <div>
      <h1>Loading...</h1>
      <Skeleton />
    </div>
  );
};

export default LoadingPage;
