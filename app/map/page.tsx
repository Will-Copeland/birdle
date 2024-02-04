"use client";
import * as React from "react";
import { Map } from "../components/Map";
import { Box } from "@mui/material";
import _, { set } from "lodash";
import Search from "../components/Search";
import SimpleSearch from "../components/SimpleSearch/SimpleSearch";
import { XenoCantoRecording } from "@/util/models/Pocketbase";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { queryRecordings } from "../search/actions/queryRecordings";

export interface IMapPageProps {}
export default function MapPage({}: IMapPageProps) {
  const [searchKey, setSearchKey] = React.useState<string>("");
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [recordings, setRecordings] = React.useState<XenoCantoRecording[]>([]);

  const { fetchStatus, data } = useQuery({
    queryKey: ["recordSearch", searchKey, searchValue],
    queryFn: () => {
      return queryRecordings(searchKey, searchValue);
    },
  });

  console.log("data", data);

  return (
    <Box>
      <SimpleSearch
        onSelect={(key, val) => {
          setSearchKey(key);
          setSearchValue(val);
        }}
      />
    </Box>
  );
}
