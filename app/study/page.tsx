import * as React from "react";
import { Search } from "../components/Search/SearchInputs";
import { Box } from "@mui/material";

export interface IStudyPageProps {}

export default function StudyPage(props: IStudyPageProps) {
  return (
    <Box>
      <Search />
    </Box>
  );
}
