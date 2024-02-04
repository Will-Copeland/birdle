"use client";
import { SearchState, XenoCantoRecording } from "@/util/models/Pocketbase";
import {
  parseURLQueryParams,
  serializeURLQueryParams,
} from "@/util/urlParsing";
import { useQueryState } from "nuqs";
import React, { useEffect, useState } from "react";
import { SearchInputs } from "./SearchInputs";
import { useQuery } from "@tanstack/react-query";
import { searchWithState } from "@/util/pocketbase/actions/recordings";
import { PrimarySearchInputs } from "./PrimarySearchInputs";
import _, { set } from "lodash";
import { useRouter } from "next/navigation";

export interface ISearchProps {
  children: React.ReactNode;
}

export default function Search({ children }: ISearchProps) {
  const router = useRouter();
  const [recordings, setRecordings] = useState<XenoCantoRecording[]>([]);
  const [searchState, setSearchState] = useState<SearchState>({});

  return (
    <>
      <SearchInputs
        onInput={(newState) => setSearchState(newState)}
        state={searchState}
      />
    </>
  );
}
