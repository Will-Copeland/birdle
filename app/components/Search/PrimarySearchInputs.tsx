import { Typography } from "@mui/material";
import * as React from "react";
import DistinctAutoComplete from "./DistinctAutoComplete";
import { LocationSearchBox } from "./LocationSearchBox";

export interface IPrimarySearchInputsProps {}

export function PrimarySearchInputs(props: IPrimarySearchInputsProps) {
  return (
    <>
      <Typography>
        Select an initial search parameter to begin searching for recordings.
      </Typography>
      <DistinctAutoComplete field="gen" label="Genus" onChange={() => {}} />
      <LocationSearchBox />
    </>
  );
}
