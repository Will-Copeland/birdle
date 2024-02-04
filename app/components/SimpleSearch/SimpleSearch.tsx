"use client";
import {
  Autocomplete,
  Box,
  CircularProgress,
  ListItem,
  MenuItem,
  Select,
  TextField,
  capitalize,
} from "@mui/material";
import React from "react";
import { simpleSearch } from "./actions/simplesearch";
import { useQuery } from "@tanstack/react-query";

export interface SimpleSearchProps {
  searchByOptions?: { key: string; label: string }[];
  onSelect: (key: string, value: string) => void;
}

const defaultSearchByOptions = [
  { key: "gen", label: "Genus" },
  { key: "sp", label: "Species" },
  { key: "en", label: "Common Name" },
  { key: "loc", label: "Location" },
];

const SimpleSearch: React.FC<SimpleSearchProps> = ({
  searchByOptions = defaultSearchByOptions,
  onSelect,
}) => {
  const [searchText, setSearchText] = React.useState<string>("");
  const [searchBy, setSearchBy] = React.useState<string>(
    searchByOptions[0].key
  );

  const { fetchStatus, data } = useQuery({
    queryKey: ["simpleSearch", searchText, searchBy],
    queryFn: () => {
      return simpleSearch(searchText, searchBy);
    },
    enabled: !!searchText,
  });

  return (
    <Box display="flex">
      <Autocomplete
        sx={{ width: 300 }}
        options={data || []}
        getOptionLabel={(opt) => opt[searchBy]}
        renderInput={(params) => <TextField {...params} label="Search" />}
        onInputChange={(e, val) => setSearchText(val)}
        renderOption={(props, opt) => (
          <ListItem
            sx={{
              cursor: "pointer",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
            onClick={() => onSelect(searchBy, opt[searchBy])}
            key={opt.id}
          >
            <span>{capitalize(opt[searchBy])}</span>
            <span>{opt.COUNT}</span>
          </ListItem>
        )}
        onChange={(e, val) => console.log(val)}
      />
      <Select
        value={searchBy}
        onChange={({ target: { value } }) => setSearchBy(value)}
      >
        {searchByOptions.map(({ key, label }) => (
          <MenuItem key={key} value={key}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {fetchStatus !== "idle" && <CircularProgress />}
    </Box>
  );
};

export default SimpleSearch;
